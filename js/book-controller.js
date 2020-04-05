'use strict'


function onInit() {
    renderPageNum();
    createBooks();
    setRtlIfHebrew(getLang());
    renderBooks();
    doTrans();
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
            <th data-trans="tId">ID</th>
            <th data-trans="tCover">Cover</th>
            <th class="sort-table" data-trans="tBookTitle" onclick="onSortByPTitle()">Book Title</th>
            <th class="sort-table" data-trans="tPrice" onclick="onSortByPrice()">Price</th>
            <th colspan="3" data-trans="tActions">Actions</th>
        <tr>
    `]);
    strHtmls.push([`</table>`]);
    document.querySelector('.books-container').innerHTML = strHtmls.join('');
}

function onSortByPrice() {
    sortByPrice();
    renderBooks();
    doTrans();
}

function onSortByPTitle() {
    sortByTitle();
    renderBooks();
    doTrans();
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
                <p class="book-price">${book.price}<span data-trans="currency">$</span></p>
            </td>
            <td>
                <button href="#"  onclick="onReadBook('${book.id}')" data-trans="tRead">Read &#128209;</button>
            </td>
            <td>
                <button href="#" onclick="onShowUpdateBook('${book.id}')" data-trans="tUpdate">Update &#128242;</button>
            </td>
            <td>
                <button href="#" onclick="onDeleteBook('${book.id}')"data-trans="tDelete">Delete &#10060;</button>
            </td>
        </tr>
        `;
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
    doTrans();
}

function onShowAddBook() {
    var elAddBookSection = document.querySelector('.add-book-section')
    elAddBookSection.hidden = false;
}

function onSubmit() {
    var name = document.querySelector('#title').value;
    var price = document.querySelector('#price').value;
    if (!name || !price) return;
    addBook(name, price);
    renderBooks();
    doTrans();
}

function onUpdate() {
    var newName = document.querySelector('#updateTitle').value;
    var newPrice = document.querySelector('#updatePrice').value;
    // if (!name.length || !price.length) return;
    updateBook(getCurrBook().id,newName, newPrice);
    renderBooks();
    doTrans();
}

function onShowUpdateBook(bookId) {
    setCurrBook(bookId);
    var elUpdateSection = document.querySelector('.update-book-section')
    elUpdateSection.hidden = false;

    var bookName = getBookById(bookId).name + '';
    elUpdateSection.querySelector('input[name="title"]').value = bookName;
    var bookPrice = getBookById(bookId).price;
    elUpdateSection.querySelector('input[name="price"]').value = bookPrice;



    // var name = prompt('new name for the book:');
    // var price = prompt('new price for the book:');
    // updateBook(bookId, name, price);
    // renderBooks();
    // doTrans();
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
    doTrans();
}
function onPrevPage() {
    prevPage();
    renderBooks();
    doTrans();
}