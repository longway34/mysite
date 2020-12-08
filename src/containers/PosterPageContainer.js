import React, { Component } from 'react';
import axios from 'axios';
import ReadmePageConponent from '../components/ReadmePageComponent';

class PosterPageContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            readme: null,
            isWaiting: props.isWaiting ? props.isWaiting : true
        };
        this.readmePath = "https://raw.githubusercontent.com/longway34/Poster_auto_suppliers_client/master/README.md";
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