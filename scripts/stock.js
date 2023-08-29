const SELECTOR = Object.freeze({
    TABLE: '.card-columns',
    TEMPLATE: '#card-template',
    DELETE_BTN: 'deleteBtn',
    POST: '.card-body',
    FORM: '.newPostForm',
    TITLE_INPUT: '#title-input',
    BODY_INPUT: '#body-input',
    SUBMIT_BUTTON: 'submit-button',
    EDIT_BUTTON: 'editBtn'
})

const shoeStockTable = document.querySelector(SELECTOR.TABLE);
const cardTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;

function init(){
    API.getList()
        .then((res) => adjustPosts(res))
}

init()

function adjustPosts(post){
    const adjustedPost = post.map(el => getPostHTML(el)).join('')
    shoeStockTable.innerHTML = adjustedPost;
}

function getPostHTML(data){
    return cardTemplate
        .replace('{{id}}', data.id)
        .replace('{{model}}', data.model)
        .replace('{{design}}', data.design)
        .replace('{{image}}', data.image)
        .replace('{{price}}', data.price)
        .replace('{{link}}', data.link)
}