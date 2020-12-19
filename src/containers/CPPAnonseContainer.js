/**
 * Прием файла README.md из GitHub репозитария проектов, написанных на С++.
 * @module CPPAnonseContainer
 */
import React, { Component } from 'react';
import axios from 'axios';
import ReadmeAnonsePageComponent from '../components/ReadmeAnonsePageComponent';

/**
 * Представляет <CPPAnonseContainer \/> React компонент. Обработка полученных README.md файлов и формирование входных параметров для компонента <ReadmeAnonsePageComponent \/>
 * @class CPPAnonseContainer
 * @param {*} [props] - входные параметры (не используются)
 */
class CPPAnonseContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            readme: [],
            isWaiting: props.isWaiting ? props.isWaiting : true
        };
        this.readmePaths = ["https://raw.githubusercontent.com/longway34/kkz/main/md_release_5/Readme.md",
                            "https://raw.githubusercontent.com/longway34/kkz/main/web_release_5/Readme.md",
                           "https://raw.githubusercontent.com/longway34/SeparatorQt2_Demo/master/Readme.MD"];
        this.readmeParams = [
            {firstParagraph: 0, numParagraphs: 7, firstImage: 0, numImages: 2, 
                url: '/projects/kkz_md',
                header: 'Металлодитектор (программа управления)'},
            {firstParagraph: 0, numParagraphs: 7, firstImage: 0, numImages: 1, 
                url: '/projects/kkz_web',
                header: 'Металлодитектор (многопоточный http сервер)'},
            {firstParagraph: 0, numParagraphs: 2, firstImage: 0, numImages: 2, 
                url: '/projects/kkz_ui',
                header: 'Сепаратор'}
        ];
    }

    componentDidMount(){
        this.readmePaths.forEach((path, index) =>{
            axios.get(this.readmePaths[index])
            .then((response) => {
                let tArray = this.state.readme.slice();
                tArray.push(response.data)
                let w = this.readmePaths.length < tArray.length ? true : false;
                this.setState({readme: tArray, isWaiting: w});
            })
            .catch((err) => {
                let tArray = this.state.readme.slice();
                tArray.push("<h1>Error loading README.MD page...</h1>")
                let w = this.readmePaths.length < tArray.length ? true : false;
                this.setState({readme: tArray, isWaiting: w});
            })
        })
    }

    render(){ 
        return (<ReadmeAnonsePageComponent isWaiting={this.state.isWaiting} readmes={this.state.readme} params={this.readmeParams} />)
    };
}

export default CPPAnonseContainer;