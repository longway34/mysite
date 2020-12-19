/**
 * Формирование страниц README.md файлов проектов
 * @module ReadmePageComponent
 */
import React from 'react';
import Markdown from 'react-markdown';
import {Spinner} from 'react-bootstrap';

/**
 * Представляет <ReadmeAnonsePageComponent \/> React компонент, для формирования html контента страниц README.md файлов проектов
 * @function ReadmeAnonsePageComponent
 * @param {Object} props - параметры, передаваемые компоненту
 * @property {String[]} props.readme - текст README.md файла проекта
 * @property {boolean} props.isWaiting - признак готовности отображения: true - ожидание; false - отображать страницу
 * @returns {String} - сформированная страника анонсов для рендеринга
 */
const ReadmePageComponent = (props) => {
    const readme = props ? props.readme : null;
    const isWaiting = props.isWaiting ? props.isWaiting : false;

    let res = (!isWaiting && readme) ? <Markdown source={readme} /> : <Spinner animation="border" variant="info" />;

    return (
        <div className="Readme-div">{res}</div>
    );
}

export default ReadmePageComponent;