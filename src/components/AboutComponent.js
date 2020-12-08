import React, {Component} from 'react';
import Markdown from 'react-markdown';
import {Spinner} from 'react-bootstrap';

class AboutComponent extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const isWaiting = this.props.isWaiting;
        let res = (!isWaiting && this.props.readme) ? <Markdown source={this.props.readme} /> : <Spinner animation="border" variant="info" />;

        return (
            <div className="Readme-div">{res}</div>
        );
    }
}

export default AboutComponent;