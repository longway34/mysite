/**
 * Прием файлов справки, сгенерируемой jsdoc-системой документирования.
 * @module HelpPageContainer
 */
import React, { Component } from 'react';
import  HelpPageComponent  from "../components/HelpPageComponent";

const { makeHelpPage, getFileFromUrl } = require('../components/Helper');
const axios = require('axios');

/**
 * Представляет <HelpPageContainer \/> React компонент. Обработка полученных файлов справки и формирование входных параметров для компонента <HelpPageComponent \/>
 * @class HelpPageContainer
 * @param {Object} [props] - входные параметры 
 * @param {String} props.url - URL файла справки
 */
class HelpPageContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            isWaiting: props.isWaiting ? props.isWaiting : true,
            url: props.url ? props.url : '/',
            html: null
        }

        this.getPage = this.getPage.bind(this);
    }

    getPage(file){
        axios.get(file)
        .then((response) => {
            let fragment = makeHelpPage(response.data, 'help');
            this.setState({html: fragment, isWaiting: false, url:this.props.url});
        })
        .catch((err) => {
            console.log(err);
            this.setState({html: `Error loading page...${err}`, isWaiting: false, url:this.props.url});
        })

    }

    componentDidMount(){
        const state = Object.assign({}, this.state);
        let li = document.URL.lastIndexOf('/');
        let file = `${document.URL.substr(0, li)}/${getFileFromUrl(state.url)}`;

        this.getPage(file);

    }

    componentDidUpdate(){
        const state = Object.assign({}, this.state);
        if(this.props.url !== state.url){
            let li = document.URL.lastIndexOf('/');
            let file = `${document.URL.substr(0, li)}/${getFileFromUrl(this.props.url)}`;

            this.getPage(file);
            this.setState({url: this.props.url});
        }
    }

    render() {
        const state = Object.assign({}, this.state);

        const isWaiting = state.isWaiting;
        const html = state.html;
        return (
            <div>
                <HelpPageComponent isWaiting={isWaiting} html={html} />
            </div>
        );
    }
}

export default HelpPageContainer;