/**
 * Формирование страниц анонсов нескольких README.md файлов проектов
 * @module ReadmeAnonsePageComponent
 */
import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/**
 * Структура параметров для создания анонса
 * @typedef {Object} AnonseParams
 * @property {number} [numParagrapts=1] - число параметров, входящих в анонс
 * @property {number} [firstParagraph=0] - номер первого параграфа, начиная с 0
 * @property {number} [numImages=1] - число картинок, входящих в анонс
 * @property {number} [firstImage=0] - номер первой картинки, начиная с 0
 * @property {String} [url=''] - URL для создания переходов. http://... - ссылкой будет весь текст анонса. Иначе только заголовок.
 */
/**
 * Структура параметров для создания анонса для паредачи в компонент
 * @typedef {Object} AnonseReactParams
 * @property {String[]} readmes - массив текстов README.md файлов проектов
 * @property {AnonseParams[]} params - массив доп. параметров для формирования анонсов
 * 
 */
const makeAnonse = require('./Helper').makeAnonse;
/**
 * Создает контекст анонса в ввиде массива bootstrap-элементов Card
 * @function context
 * @param {String[]} anonses - массив текстов Readme.md файлов проектов
 * @param {AnonseParams[]} params - массив структур с параметрами включения для каждого Readme.md файла
 * @returns {String} - Массив блоков bootstrap Card для рендеринга
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
/**
 * Представляет <ReadmeAnonsePageComponent \/> React компонент, для формирования html контента анонса страниц
 * @function ReadmeAnonsePageComponent
 * @param {Object} props - параметры, передаваемые компоненту
 * @property {AnonseReactParams} props.params - параметры формирования анонса
 * @property {String[]} props.readmes - массив текстов README.md файлов проектов
 * @property {boolean} props.isWaiting - признак готовности отображения: true - ожидание; false - отображать страницу
 * @returns {String} - сформированная страника анонсов для рендеринга
 */
const ReadmeAnonsePageComponent = props => {
    let res = null;
    if(!props.isWaiting){
        res = context(props.readmes, props.params);
    } else {
        res = (<Spinner animation="border" variant="info" />)
    }
    return (<div>{res}</div>)

};

export default ReadmeAnonsePageComponent;