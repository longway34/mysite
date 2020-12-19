/**
 * Формирование страниц помощи проекта
 * @module HelpPageComponent
 */
import React from 'react';
import {Card, Spinner} from 'react-bootstrap';

/**
 * Представляет <HelpPageComponent \/> React компонент, формирующий html контент страниц помощи проекта
 * @function HelpPageComponent
 * @param {Object} props - параметры, передаваемые компоненту
 * @property {String[]} props.html - текст html файла справки
 * @property {boolean} props.isWaiting - признак готовности отображения: true - ожидание; false - отображать страницу
 * @returns {String} - сформированная страника анонсов для рендеринга
 */
const HelpPageComponent = (props) => {
    const html = props ? props.html : null;
    const isWaiting = props.isWaiting;

    // let res = (!isWaiting && html) ? <div dangerouslySetInnerHTML={{__html: html }} /> : <Spinner animation="border" variant="info" />;
    let res = (!isWaiting && html) ? html : <Spinner animation="border" variant="info" />;

    return (
        <Card>
            <Card.Body>
                { res }
            </Card.Body>
        </Card>
);
}

export default HelpPageComponent;