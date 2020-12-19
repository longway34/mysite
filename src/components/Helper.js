/**
 * Модуль для определения вспомогалельных функций
 * @module Helper
 */
import { Link } from 'react-router-dom';
import ReactHtmlParser, { convertNodeToElement,  processNodes  } from "react-html-parser";
import {NavLink, Nav, NavItem} from 'react-bootstrap';
import LinkDuo from './LinkDuo';

const MarkdownIt = require('markdown-it');
var mdReader = new MarkdownIt();
var cheerio = require('cheerio');
// var jquery = require('jquery');


/**
 * Cоздает на основе параметров html текст для страницы-анонса
 * @function makeAnons 
 * @requires MarkdownIt
 * @requires cheerio
 * 
 * @param {String} readme - html текст для создания страницы-анонса
 * @param {number} [numParagraphs=1] - количество параграфов 
 * @param {number} [firstParagraph=0] - первый параграф для ананса, начиная с 0
 * @param {number} [numImages=1] - количество картинок для создания миниатюры анонса
 * @param {number} [firstImage=0] - первая картинка для создания миниатюры анонса, начиная с 0
 * @param {String} [url=''] - возможная ссылка для перехода (http://... - весь анонс-ссылка иначе - местная ссылка для загаловка)
 * @returns {string} - html фрагмент анонса
 */
export const makeAnonse = (readme, numParagraphs=1, firstParagraph=0, numImages=1, firstImage=0, url='') =>{
    let html = mdReader.render(readme);
    let $ = cheerio.load(html);
    let outParagraph = [];
    let outImages = [];
    let paragraphCount = 0;
    $('p, h1, h2, h3, h4, h5, h6').each((index, paragraph) => {
        if(paragraph.firstChild.type === 'text'){
            if(index >= firstParagraph){
                if(++paragraphCount > numParagraphs){
                    return;
                } else {
                    outParagraph.push(paragraph);
                }
            }
        }
    })
    let imagesCount = 0;
    $('img').each((index, image) =>{
        if(index >= firstImage){
            if(++imagesCount > numImages){
                return;
            } else {
                outImages.push(image);
            }
        }
    })
    $ = url === '' ? cheerio.load('<div id="root"/>') : cheerio.load(`<div id="root"><a href=${url} target="_blank" rel="nofollow noreferrer"/></div>`);
    let rootDiv = url ? $('#root > a') : $('#root');
    let imgsDiv = $('<div />');
    imgsDiv.addClass('anonseImagesDiv');
    outImages.forEach((img, index) =>{
        imgsDiv.append(img);
    })
    rootDiv.append(imgsDiv);
    outParagraph.forEach((p, index) =>{
        rootDiv.append(p);
    });

    return $.html('#root');

}
/**
 * Возвращает имя файла из строки URL
 * @function getFileFromUrl 
 * @param {String} path - строка URL
 * @returns {String} - имя файла
 */
export const getFileFromUrl = (path) => {
    while(path.startsWith('/')) path = path.substr(1);

    let ind = path.lastIndexOf('/');
    if(ind < 0){
        return path;
    }
    return path.substr(ind+1);
}

const getBody = (html) => {
    let firstNav = html.indexOf('<nav>');
    let lastNav = html.indexOf('</nav>');

    let firstBody = html.indexOf('<body>')
    let lastBody = html.indexOf('</body>');
    
    let res = { 
        nav: `<div class='nav'>${html.substr(firstNav+5, lastNav-firstNav-5)}</div>`,
        prefix: `<div class='help-page-prefix'>${html.substr(firstBody+6, firstNav - firstBody-6)}</div>`,
        suffix: `<div class='help-page-suffix'>${html.substr(lastNav+6, lastBody - lastNav - 4)}</div>`
    }
    return res;
}

const transformModule = (node, index) => {
    if(node.type === 'tag' && node.name === 'img'){
        node.attribs.class = 'help-page-image';
        node.attribs.width = '100%';
        return convertNodeToElement(node, index, transformFooter);
    }
    if (node.type === "tag" && node.name === "ul") {
        return <Nav>{processNodes(node.children, transformNavigate)}</Nav>
    }
  
    if (node.type === "tag" && node.name === "li") {
        return <NavItem>{processNodes(node.children, transformNavigate)}</NavItem>
    }
  
    if (node.type === "tag" && node.name === "a") {
      let file = node.attribs.href.startsWith('http') ? node.attribs.href : getFileFromUrl(node.attribs.href);
      if(file.indexOf('#') > 0){
          return null;
      }
      
      return <LinkDuo to={file} href={file} as={Link}>{processNodes(node.children, transformNavigate)}</LinkDuo>
    }
    if(node.type === 'text'){
        if(node.data.toLowerCase() === 'home'){
            node.data = "Этот веселый сайт";
            convertNodeToElement(node, index, transformNavigate);
        }
        // console.log(node);
    }
}

const transformNavigate = (node, index) =>{
    if (node.type === "tag" && node.name === "div" && node.attribs.class === 'nav') {
        node.attribs.class = 'help-page-nav';
        return convertNodeToElement(node, index, transformNavigate);
    }
  
    if (node.type === "tag" && node.name === "ul") {
        return <Nav className="flex-column">{processNodes(node.children, transformNavigate)}</Nav>
    }
  
    if (node.type === "tag" && node.name === "li") {
        return <NavItem>{processNodes(node.children, transformNavigate)}</NavItem>
    }
  
    if (node.type === "tag" && node.name === "a") {
      let file = getFileFromUrl(node.attribs.href);
      if(file.indexOf('#') > 0){
          return null;
      }
      return <NavLink to={file} href={file} as={Link}>{processNodes(node.children, transformNavigate)}</NavLink>
    }
    if(node.type === 'text'){
        if(node.data.toLowerCase() === 'home'){
            node.data = "Этот веселый сайт";
            convertNodeToElement(node, index, transformNavigate);
        }
        // console.log(node);
    }
  
}

const transformFooter = (node, index) =>{
    if(node.type === 'tag' && node.name === 'img'){
        node.attribs.class = 'help-page-image';
        node.attribs.width = '100%';
        return convertNodeToElement(node, index, transformFooter);
    }
    if(node.type === 'tag' && node.name === 'footer'){
        return <div class='help-page-suffix'>{processNodes(node.children, transformFooter)}</div>
    }
    if(node.type === 'tag' && node.name === 'br'){
        return null;
    }
}

const optionsNavigate = {
    decodeEntities: true,
    transform: transformNavigate
}

const optionsModule = {
    decodeEntities: true,
    transform: transformModule
}


const optionFooter = {
    decodeEntities: true,
    transform: transformFooter
}
/**
 * Анализирует полученных html фрагмент и адаптирует его для представления в рамках React-router компонентов
 * @function makeHelpPage
 * @param {*} html - текст html страницы, для представления
 * @return {Object} - компонент для вставки на страницу
 */
export const makeHelpPage = (html) =>{
    let body = getBody(html);

    let res = [];
    res.push(ReactHtmlParser(body.prefix, optionsModule));
    res.push(ReactHtmlParser(body.nav, optionsNavigate));
    res.push(ReactHtmlParser(body.suffix, optionFooter));

    return (<div id='help-page'><div id='help-page-middle'>{res[0]}{res[1]}</div>{res[2]}</div>);
}

