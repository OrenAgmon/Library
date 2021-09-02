let myLibrary = []
let librarySize = 0;

let openModalButtons = document.querySelectorAll('.modal-btn')
let overlay = document.querySelector('.overlay')
let closeModalButtons = document.querySelectorAll('.close-modal-btn')

let cardContainer = document.getElementById('cards-container')


let bookName = document.getElementById('name-input')
let bookAuthor = document.getElementById('author-input')
let bookPages = document.getElementById('pages-input')
let isRead = document.getElementById('read-checkbox')
let buttonSubmit = document.getElementById('submit-book')

function Book(bookName, author, pages, isRead){
    this.name = bookName,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
};



buttonSubmit.addEventListener('click', () =>{

    let problem = document.querySelector('#input-problem')
    if(!bookAuthor.value||!bookPages.value||!bookName.value){
        
        problem.textContent = 'please fill everything'
    }
    else if(!isNaN(bookAuthor.value)||!isNaN(bookName.value)){
        problem.textContent = 'numbers only in pages '
    }

    else if(isNaN(parseInt(bookPages.value))) problem.textContent = 'enter number for pages'
    else{
        let newBook = new Book(`${bookName.value}`, `${bookAuthor.value}`, `${bookPages.value}`, `${isRead.value}`)
        appendBook(newBook)
        const modal = buttonSubmit.closest('.modal')
        closeModal(modal)
        problem.textContent=''
    }
})
openModalButtons.forEach(button =>{
    const dataKey = button.dataset.modalTarget
    button.addEventListener('click', ()=>{
        const modal = document.querySelector(dataKey)
        openModal(modal)
    })
})
closeModalButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        const modal = button.closest('.modal')
        closeModal(modal);
    })
  
})
overlay.addEventListener('click', ()=>{
    const modal = document.querySelector('.modal.active')
    closeModal(modal)
})




function openModal(modal){
    if(modal==null) return
    
    modal.classList.add('active')
    overlay.classList.add('active')

}
function closeModal(modal){
    if(modal==null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')

}






function appendBook(book){

    
    myLibrary[librarySize] = book;
    librarySize++;
    console.log(myLibrary);
    libraryDisplay()
    clearInput()
   
    

    
}

function clearInput(){
    bookName.value = ''
    bookAuthor.value = ''
    bookPages.value = ''
    isRead.checked = false
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
        let isReadDisplay = document.createElement('input')

        let checkContainer = document.createElement('div')
        let checkboxLabel = document.createElement('label')
        let deleteBook = document.createElement('button')

        deleteBook.textContent = 'delete'
        deleteBook.setAttribute('id', 'delete-button')
        deleteBook.addEventListener('click', ()=>{
            document.querySelector(`[data-index="${bookDisplayed.dataset.index}"]`).remove()
        })
        
        isReadDisplay.setAttribute('type','checkbox')
        isReadDisplay.setAttribute('id','check-read')
        if(isRead.checked){
            isReadDisplay.checked = true;
        }
        checkboxLabel.setAttribute('for', 'check-read')
        checkboxLabel.innerHTML = 'finished'
        checkContainer.classList.add('check-container')
        checkContainer.appendChild(checkboxLabel)
        checkContainer.appendChild(isReadDisplay)



        nameDisplay.textContent = myLibrary[librarySize-1].name
        authorDisplay.textContent = 'Author: ' + myLibrary[librarySize-1].author
        pagesDisplay.textContent = 'pages: ' + myLibrary[librarySize-1].pages
        isRead.textContent = 

        nameDisplay.setAttribute('id','book-title')
        authorDisplay.classList.add('book-details')
        pagesDisplay.classList.add('book-details')
        
        
        bookDisplayed.appendChild(nameDisplay)
        bookDisplayed.appendChild(authorDisplay)
        bookDisplayed.appendChild(pagesDisplay)
        bookDisplayed.appendChild(checkContainer)
        bookDisplayed.appendChild(deleteBook)

        bookDisplayed.classList.add('cards')
      
        cardContainer.appendChild(bookDisplayed)

       
        console.log(bookDisplayed);
    
}

// function deleteFromLibrary(index){
//     document.querySelector(`[data-index="${index}"]`).remove()
        

    
// }