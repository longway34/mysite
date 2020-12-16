import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import axios from 'axios';
import ReadmeAnonsePageComponent from '../components/ReadmeAnonsePageComponent';
// import ReadmePageComponent from './ReadmePageComponent';

const makeAnonse = require('../components/Helper');

class NodejsAnonseContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            readme: [],
            isWaiting: props.isWaiting ? props.isWaiting : true
        };
        this.readmePaths = ["https://raw.githubusercontent.com/longway34/mysite/master/README.md",
                           "https://raw.githubusercontent.com/longway34/Poster_auto_suppliers_server/master/README.md",
                           "https://raw.githubusercontent.com/longway34/Poster_auto_suppliers_client/master/README.md"];
        this.readmeParams = [
            {firstParagraph: 0, numParagraphs: 5, firstImage: 0, numImages: 1, 
                // url: 'https://github.com/longway34/mysite', 
                url: '/about',
                header: 'Этот забавный сайт...'},
            {firstParagraph: 1, numParagraphs: 2, firstImage: 0, numImages: 1, 
                // url: 'https://github.com/longway34/Poster_auto_suppliers_server', 
                url: '/projects/poster_s',
                header: 'Poster (серверная часть)'},
            {firstParagraph: 1, numParagraphs: 2, firstImage: 1, numImages: 2, 
                // url: 'https://github.com/longway34/Poster_auto_suppliers_client', 
                url: '/projects/poster_c',
                header: 'Poster (клиентская часть)'}
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

export default NodejsAnonseContainer;