const MarkdownIt = require('markdown-it');
var mdReader = new MarkdownIt();
var cheerio = require('cheerio');

/**
 * @function makeAnonse - создает на основе параметров html текст для страницы-анонса
 * @param {string} readme - html текст для создания страницы-анонса
 * @param {number} numParagraphs - количество параграфов 
 * @param {number} firstParagraph - первый паран=граф для ананса, начиная с 0
 * @param {number} numImages - количество картинок для создания миниатюры анонса
 * @param {number} firstImage - первая картинка для создания миниатюры анонса, начиная с 0
 * @param {number} url - возможная ссылка для перехода (http://... - весь анонс-ссылка иначе - местная ссылка для загаловка)
 * @returns {string} - html фрагмент анонса
 */
const makeAnonse = (readme, numParagraphs=1, firstParagraph=0, numImages=1, firstImage=0, url='') => {
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
            if(++imagesCount > numImages){
                return;
            } else {
                outImages.push(image);
            }
        }
    })
    $ = url == '' ? cheerio.load('<div id="root"/>') : cheerio.load(`<div id="root"><a href=${url} target="_blank" rel="nofollow noreferrer"/></div>`);
    // if(url != ''){
    //     $.root('#root').children().append(`<a src='${url} />`);
    // }
    let rootDiv = url ? $('#root > a') : $('#root');
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
/** @exports */
module.exports.makeAnonse = makeAnonse;
// exports {makeAnonse}