/**
 * Прием файла README.md из GitHub репозитария проекта Poster
 * @module AboutPageContainer
 */
import React, { Component } from 'react';
import axios from 'axios';
import ReadmePageConponent from '../components/ReadmePageComponent';

/**
 * Представляет <PosterPageContainer \/> React компонент. Обработка полученных README.md файлов и формирование входных параметров для компонента <ReadmeAnonsePageComponent \/>
 * @class PosterPageContainer
 * @param {Object} props - входные параметры 
 * @param {('client|server')} props.mode='server' - для получения README.md:  "Клиентской части" и "Серверной части" соответственно
 */
class PosterPageContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            readme: null,
            isWaiting: props.isWaiting ? props.isWaiting : true
        };
        this.readmePath = props.mode === 'client' ? "https://raw.githubusercontent.com/longway34/Poster_auto_suppliers_client/master/README.md" :
        "https://raw.githubusercontent.com/longway34/Poster_auto_suppliers_server/master/README.md";
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

export default PosterPageContainer;