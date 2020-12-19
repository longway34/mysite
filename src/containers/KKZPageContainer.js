/**
 * Прием файла README.md из GitHub репозитария различных частей проекта 'Металлодитектор'
 * @module KKZPageContainer
 */
import React, { Component } from 'react';
import axios from 'axios';
import ReadmePageConponent from '../components/ReadmePageComponent';

/**
 * Представляет <KKZPageContainer \/> React компонент. Обработка полученных README.md файлов и формирование входных параметров для компонента <ReadmeAnonsePageComponent \/>
 * @class KKZPageContainer
 * @param {Object} [props] - входные параметры 
 * @param {('md|web|ui')} [props.mode='md'] - для получения README.md:  "Программы управления", "Интерфейсной программы" и "Пользовательского интерфейса" соответственно
 */
class KKZPageContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            readme: null,
            isWaiting: props.isWaiting ? props.isWaiting : true
        };
        switch(this.props.mode){
            case 'md':
                this.readmePath = "https://raw.githubusercontent.com/longway34/kkz/main/md_release_5/Readme.md";
                break;
            case 'web':
                this.readmePath = "https://raw.githubusercontent.com/longway34/kkz/main/web_release_5/Readme.md";
                break;
            case 'ui':
                this.readmePath = "https://raw.githubusercontent.com/longway34/kkz/main/Web-07_1/Readme.md";
                break;
            default:
                this.readmePath = "https://raw.githubusercontent.com/longway34/kkz/main/md_release_5/Readme.md";
                break;
            }
    }

    componentDidMount(){
        axios.get(this.readmePath)
        .then((response) => {
            this.setState({readme: response.data, isWaiting: false});
        })
        .catch((err) => {
            this.setState({readme: "<h1>Error loading README.MD page...</h1>", isWaiting: false});
        })

    }

    render() {
        return (
            <ReadmePageConponent isWaiting={this.state.isWaiting} readme={this.state.readme}></ReadmePageConponent>
        );
    }
}

export default KKZPageContainer;