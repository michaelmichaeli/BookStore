'use strict'


function onInit() {
    renderPageNum();
    createBooks();
    renderBooks();
}

function renderPageNum() {
    document.querySelector('.next-page p').innerText = getPageNum() + 1;
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(getBooksHtml)
    strHtmls.unshift([`
        <table class="book-table">
        <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Book Title</th>
            <th>Price</th>
            <th colspan="3">actions</th>
        <tr>
    `]);
    strHtmls.push([`</table>`]);
    document.querySelector('.books-container').innerHTML = strHtmls.join('');
}
function getBooksHtml(book) {
    return `
        <tr>
            <td>
                ${book.id}
            </td>
            <td>
                <img class="book-img" src="${book.imgUrl}" alt="Book cover image">
            </td>
            <td>
                <h5 class="book-title">${book.name}</h5>
            </td>
            <td>
                <p class="book-price">${book.price}$</p>
            </td>
            <td>
                <button href="#"  onclick="onReadBook('${book.id}')">Read &#128209;</button>
            </td>
            <td>
                <button href="#" onclick="onUpdateBook('${book.id}')">Update &#128242;</button>
            </td>
            <td>
                <button href="#" onclick="onDeleteBook('${book.id}')">Delete &#10060;</button>
            </td>
        </tr>
        `;
}
function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onShowAddBook() {
    document.querySelector('.add-book-section').hidden = false;
}

function onSubmit() {
    var name = document.querySelector('#title').value;
    var price = document.querySelector('#price').value;
    if (!name || !price) return;
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var name = prompt('new name for the book:');
    var price = prompt('new price for the book:');
    
    updateBook(bookId, name, price);
    renderBooks();
}

function onReadBook(bookId) {
    setCurrBook(bookId);
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('h6').innerText = book.price + '$';
    elModal.querySelector('p').innerText = book.desc;
    elModal.querySelector('img').src = book.imgUrl;
    document.querySelector('input[name="rate"]').value = book.rate;
    elModal.hidden = false;
}

function onCloseModal() {
    var newRate = document.querySelector('input[name="rate"]').value;
    setRateById(getCurrBook().id, newRate);
    document.querySelector('.modal').hidden = true;
}

function onNextPage() {
    nextPage();
    renderBooks();
}