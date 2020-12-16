import React, {Component} from 'react';
import Markdown from 'react-markdown';
import {Spinner} from 'react-bootstrap';
// import HTMLView from 'react-native-htmlview';

var MarkdownIt = require('markdown-it'); 
var mdReader = new MarkdownIt();

var cheerio = require('cheerio');

class PosterPageComponent extends Component {
    constructor(props){
        super(props);


    }

    anonsCreate(readme, numParagraphs=3, firstParagraph=0, numImage=1, firstImage=0){
        let html = mdReader.render(readme);
        let $ = cheerio.load(html);
        let outParagraph = [];
        let outImages = [];
        let paragraphCount = 0;
        $('p, h1, h2, h3, h4, h5, h6').each((index, paragraph) => {
            if(paragraph.firstChild.type == 'text'){
                if(index >= firstParagraph){
                    if(++paragraphCount > numParagraphs){
                        return;
                    } else {
                        outParagraph.push(paragraph);
                    }
                }
            }
            // console.log(paragraph.html);
        })
        let imagesCount = 0;
        $('img').each((index, image) =>{
            if(index >= firstImage){
                outImages.push(image);
                if(++imagesCount > numImage){
                    return;
                }
            }
        })
        $ = cheerio.load('<div id="root"/>');
        let rootDiv = $('#root');
        let imgsDiv = $('<div />');
        imgsDiv.addClass('anonseImagesDiv');
        outImages.forEach((img, index) =>{
            imgsDiv.append(img);
        })
        rootDiv.append(imgsDiv);
        outParagraph.forEach((p, index) =>{
            // let pn = $('<p>').append(p.firstChild.data);
            rootDiv.append(p);
        });

        // console.log(aid.data());
        return $.html('#root');
    }

    render() {
        const readme = this.props ? this.props.readme : null;
        const isWaiting = this.props.isWaiting;
        const anonse = this.props ? this.props.anonse ? true : false : false;

        if(anonse && readme && !isWaiting){
            var html = this.anonsCreate(readme);
            return (<div dangerouslySetInnerHTML={{__html: html }} />);
        }
        let res = (!isWaiting && this.props.readme) ? <Markdown source={this.props.readme} /> : <Spinner animation="border" variant="info" />;

        return (
            <div className="Readme-div">{res}</div>
        );
    }
}

export default PosterPageComponent;