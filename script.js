let myLibrary = [];

function Book(title, author, pages, haveRead, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${haveRead ? 'have read' : 'not read yet'}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(book) {
    let index = myLibrary.indexOf(book)
    myLibrary.splice(index, 1)
    
}

function printInfo(library) {
    library.forEach(element => {
        console.log(element.info());
    });
}

function createCard(book, container) {
    const divBook = document.createElement('div');
    divBook.classList.add('book');
    container.appendChild(divBook);
    const card = document.createElement('div');
    card.classList.add("card");
    divBook.appendChild(card);
    addElememt('title', card, book.title);
    addElememt('by', card, 'By');
    addElememt('author', card, book.author);
    addStraps(card);
    addElememt('page', card, `A ${book.pages} page story`);
    addElememt('read-status', card, `${book.haveRead ? 'Finished' : 'Unread'}`);
    addButton('rmv-btn', card, 'Remove', book)
    changeButton('change', card, 'Change', book)
    addElememt('back-cover', divBook);
}

function removeCard(element) {
    element.parentElement.parentElement.remove();
}

function updateBook(element, book) {
   let status = element.parentElement.querySelector('.read-status');
   if (status.textContent === 'Unread') {
    status.textContent = 'Finished'
   } else {
    status.textContent = 'Unread'
   }
}

function addElememt(class_name, container, text = '') {
    const element = document.createElement('div');
    element.classList.add(class_name);
    element.textContent = text;
    container.appendChild(element);
}

function addButton(className, container, text = '', book) {
    const element = document.createElement('button');
    element.classList.add(className);
    element.textContent = text
    element.addEventListener('click', () => {
        removeBookFromLibrary(book);
        removeCard(element)
    })
    container.appendChild(element)
}

function changeButton(className, container, text = '', book) {
    const element = document.createElement('button');
    element.classList.add(className);
    element.textContent = text
    element.addEventListener('click', () => {
        book.haveRead ? book.haveRead = false : book.haveRead = true;
        updateBook(element, book);
    })
    container.appendChild(element)
}

function addStraps(container) {
    const straps = document.createElement('div');
    straps.classList.add('straps');
    container.appendChild(straps);
    const strap = document.createElement('div');
    strap.classList.add('strap');
    straps.appendChild(strap);
    const strap1 = document.createElement('div');
    strap1.classList.add('strap');
    straps.appendChild(strap1);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const kingsQuest = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '1344', false);
const ifIDidIt = new Book('Pride and Prejudice', 'Jane Austen', '735', false);
const backStreet = new Book('Moby-Dick', 'Herman Melville', '127', false);
const ghostShell = new Book('The Catcher in the Rye', 'J.D. Salinger', '481', false);

addBookToLibrary(theHobbit);
addBookToLibrary(kingsQuest);
addBookToLibrary(ifIDidIt);
addBookToLibrary(backStreet);
addBookToLibrary(ghostShell);


const container = document.querySelector('.container');

const form = document.querySelector('.form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = document.querySelector('.new-title').value;
    let author = document.querySelector('.new-author').value;
    let pages = document.querySelector('.new-page').value;
    let status = document.getElementById('read-status');
    console.log(status)
    const book = new Book(title, author, pages, status.checked);
    addBookToLibrary(book);
    createCard(book, container);
    title.textContent = '';
    author.textContent = '';
    pages.textContent = '';
    status.checked = false;

})


myLibrary.forEach(element => {
    createCard(element, container);
});