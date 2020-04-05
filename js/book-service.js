'use strict'

const KEY = 'books';
var gBooks;
const PAGE_SIZE = 4;
var gPageIdx = 0;
var gCurrBook;

function getPageNum() {
    return gPageIdx;
}

function getBookById(bookId) {
    return gBooks.find((book)=> book.id === bookId);
}

function updateBook(bookId, newName, newPrice) {
    if (newName === '' || newPrice === '') return;
    var book = getBookById(bookId);
    book.name = newName;
    book.price = newPrice;
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price, 'img/book.png');
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex((book) => bookId === book.id);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function _createBook(bookName, bookPrice, imgUrl) {
    return {
        id: makeId(),
        name: bookName,
        price: bookPrice,
        imgUrl: imgUrl,
        desc: makeLorem(),
        rate: 5
    }
}

function setRateById(bookId, newRate) {
    getBookById(bookId).rate = newRate;

    _saveBooksToStorage();
}

function getCurrBook(){
    return gCurrBook;
}

function setCurrBook(bookId) {
    gCurrBook = getBookById(bookId);
    _saveBooksToStorage();
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 25; i++) {
            var name = 'Book Title';
            var price = 100;
            var imgUrl = 'img/book.png';
            const book = _createBook(name, price, imgUrl);
            books.i = i;
            books.push(book);
        }
    }
    gBooks = books;
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function nextPage() {
    // TODO: calc the 3
    // IF LEFT WITH MORE BOOKS THAN BOOK-PER-PAGE TO RENDER...
    if (gBooks.length - PAGE_SIZE * gPageIdx > PAGE_SIZE)    
                gPageIdx++;
    else gPageIdx = 0;
    renderPageNum()
}

