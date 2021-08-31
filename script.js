let myLibrary = []
let librarySize = 0;

let cardContainer = document.getElementById('cards-container')




let buttonSubmit = document.getElementById('submit-book')
let bookName = document.getElementById('name-input')
let bookAuthor = document.getElementById('author-input')
let bookPages = document.getElementById('pages-input')
let isRead = document.getElementsByName('book-status')
let deleteButton;


buttonSubmit.addEventListener('click', appendBook)




function Book(bookName, author, pages, isRead){
    this.name = bookName,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
};


function appendBook(){
    let newBook = new Book(`${bookName.value}`, `${bookAuthor.value}`, `${bookPages.value}`, `${isRead.value}`)
    myLibrary[librarySize] = newBook;
    librarySize++;
    console.log(myLibrary);
    libraryDisplay()
    clearInput()
   
    

    
}

function clearInput(){
    bookName.value = ''
    bookAuthor.value = ''
    bookPages.value = ''
}




function libraryDisplay(){
   
    
    for(let i =myLibrary.length-1; i<myLibrary.length;i++){

        addBookDisplay()
    }

}

function addBookDisplay(){

    const bookDisplayed = document.createElement('div')
        bookDisplayed.setAttribute('data-index', `${librarySize-1}`)

        let nameDisplay = document.createElement('p')
        let authorDisplay = document.createElement('p')
        let pagesDisplay = document.createElement('p')
        let deleteBook = document.createElement('button')

        deleteBook.textContent = 'delete'
        deleteBook.setAttribute('id', 'delete-button')
        
    
        deleteBook.addEventListener('click', ()=>{
            document.querySelector(`[data-index="${bookDisplayed.dataset.index}"]`).remove()
        })
     


        nameDisplay.textContent = myLibrary[librarySize-1].name
        authorDisplay.textContent = myLibrary[librarySize-1].author
        pagesDisplay.textContent = myLibrary[librarySize-1].pages

        
        bookDisplayed.appendChild(nameDisplay)
        bookDisplayed.appendChild(authorDisplay)
        bookDisplayed.appendChild(pagesDisplay)
        bookDisplayed.appendChild(deleteBook)

        bookDisplayed.classList.add('cards')
      
        cardContainer.appendChild(bookDisplayed)

       
        console.log(bookDisplayed);
    
}

function deleteFromLibrary(index){
    document.querySelector(`[data-index="${index}"]`).remove()
        

    
}