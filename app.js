//Book constructor
function Book(title, author, isbn) {
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}



//UI constructor
function UI() {}


//Add book to List
UI.prototype.addBookList = function (book) {
   const list = document.getElementById('book-list');

   //Creat tr element
   const row = document.createElement('tr');

   //Insert columns
   row.innerHTML =`
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td class="last-td"><a class="delete" href="#">
   X</a></td>
   `;
   
   list.appendChild(row);

}



UI.prototype.showAlert = function(message, className) {
   const div = document.createElement('div');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(message));

   const container = document.querySelector('.container');
   const form = document.querySelector('#book-form');
   container.insertBefore(div, form);

   setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 2000);
}

UI.prototype.deleteBook = function(target) {
   if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
   }
}

//Clear fields
UI.prototype.clearFields = function() {
   document.getElementById('title').value ='';
   document.getElementById('author').value ='';
   document.getElementById('isbn').value ='';
};

// Event Listeners
document.getElementById('book-form').addEventListener('submit', (e)=>{
     // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate book (создаем обьект)
    const book = new Book(title, author, isbn);
    const ui = new UI();
   
    if(title === '' || author === '' || isbn === '') {
       ui.showAlert('Пожалуйста, заполните все поля', 'error');
    } else {
       ui.addBookList(book);
       ui.showAlert('Книга добавлена!', 'success');
       ui.clearFields();
    }
 
    e.preventDefault();
    
});


document.getElementById('book-list').addEventListener('click', function(e) {
   const ui = new UI();

   ui.deleteBook(e.target);

   ui.showAlert('Книга удалена!', 'success');

   e.preventDefault();
    
})

