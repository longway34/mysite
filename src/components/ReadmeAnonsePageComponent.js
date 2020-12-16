import React from 'react';
import { Card, CardDeck, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
/**
 * @typedef {Object} Params
 * @param {number} numParagrapts - число параметров, входящих в анонс
 * @param {number} firstParagraph - номер первого параграфа, начиная с 0
 * @param {number} numImages - число картинок, входящих в анонс
 * @param {number} firstImage - номер первой картинки, начиная с 0
 * @param {string} url - URL для создания переходов. http://... - ссылкой будет весь текст анонса. Иначе только заголовок.
 */
const makeAnonse = require('./Helper').makeAnonse;
/**
 * Создает контекст анонса в ввиде bootstrap-элемента Card
 * @param {string[]} anonses - массив текстов Readme.md файлов проектов
 * @param {Params[]} params - массив структур с параметрами включения для каждого Readme.md файла
 */
const context = (anonses, params) => {
    return anonses.map((a, index) =>{
        let html = makeAnonse(a, params[index].numParagraphs, params[index].firstParagraph, params[index].numImages, params[index].firstImage, params[index].url.startsWith("http") ? params[index].url : '');
        let ret = [];
        if(params[index].header && params[index].header.length > 0){
            ret.push(<Card.Header className="anonseCardHeader">
                        <Card.Link href="#" to={!params[index].url.startsWith('http') ? params[index].url : ''} as={Link} >{params[index].header}</Card.Link>
                    </Card.Header>);
        }
        ret.push(<Card.Body>
                    <div dangerouslySetInnerHTML={{__html: html }} />
                </Card.Body>);
        if(params[index].footer && params[index].header.footer > 0){
            ret.push(<Card.Footer>
                        {params[index].footer}
                    </Card.Footer>);
        }

        return (
            <Card>
                {ret}
            </Card>
        )

    })
}


const ReadmeAnonsePageComponent = props => {
    let res = null;
    if(!props.isWaiting){
        res = context(props.readmes, props.params);
        // res = (<CardDeck> 
        //         {context(props.readmes, props.params)};
        //     </CardDeck>
        // )
    } else {
        res = (<Spinner animation="border" variant="info" />)
    }
    return (<div>{res}</div>)

};

export default ReadmeAnonsePageComponent;