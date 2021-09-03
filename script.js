function Book(bookName, author, pages, isRead){
    this.name = bookName,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
};

let myLibrary = []


let openModalButtons = document.querySelectorAll('.modal-btn')
let overlay = document.querySelector('.overlay')
let closeModalButtons = document.querySelectorAll('.close-modal-btn')
let cardContainer = document.getElementById('cards-container')
let bookName = document.getElementById('name-input')
let bookAuthor = document.getElementById('author-input')
let bookPages = document.getElementById('pages-input')
let isRead = document.getElementById('read-checkbox')
let buttonSubmit = document.getElementById('submit-book')





buttonSubmit.addEventListener('click', () =>{

    let newBook = new Book(`${bookName.value}`, `${bookAuthor.value}`, `${bookPages.value}`, `${isRead.value}`)
    
    if(validateForm(newBook)){

        
        
        appendBook(newBook)
        const modal = buttonSubmit.closest('.modal')
        closeModal(modal)
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


function validateForm(book){
    let problem = document.querySelector('#input-problem')
    if(isBookExist(book)){
        problem.textContent = 'this book already Exists!'
        return false;
    }
    if(!book.author||!book.pages||!book.name){
        
        problem.textContent = 'please fill everything'
        return false;
    }
    else if(!isNaN(book.author)||!isNaN(book.name)){
        problem.textContent = 'numbers only in pages '
        return false
    }

    else if(isNaN(parseInt(bookPages.value))) 
    {
        problem.textContent = 'enter number for pages'
        return false;
    }
    else{
        problem.textContent = ''
        return true;
    }
}

function appendBook(book){

    
    myLibrary.push(book)
   
    console.log(myLibrary);
    updateLibraryDisplay()
    clearInput()

}

function clearInput(){
    bookName.value = ''
    bookAuthor.value = ''
    bookPages.value = ''
    isRead.checked = false
}

 function updateLibraryDisplay(){
    myLibrary.forEach(book =>{
       if(!isBookExist(book)){
           addBookDisplay(book)
       }
    })
}

function isBookExist(book){
    let allBookCards = document.querySelectorAll('.cards')
    let bookCardsArr = Array.prototype.slice.call(allBookCards)
    
    let titlesArray = []
    for(let i = 0; i<bookCardsArr.length;i++){
        if(bookCardsArr[i].childNodes[0].innerHTML !== undefined){
         titlesArray[i] = bookCardsArr[i].childNodes[0].innerHTML
        }
    }
    if(titlesArray.includes(book.name)) return true;

    return false;
}


function addBookDisplay(book){

    const bookDisplayed = document.createElement('div')
        bookDisplayed.setAttribute('data-index', `${myLibrary.indexOf(book)}`)

        let headerContainer = document.createElement('div')
        let editBtn = createEditButton()


        let nameDisplay = document.createElement('p')
        nameDisplay.setAttribute('id','name-display')

        let authorDisplay = document.createElement('p')
        authorDisplay.classList.add('book-details')
        authorDisplay.setAttribute('id','author-display')

        let pagesDisplay = document.createElement('p')
        pagesDisplay.classList.add('book-details')
        pagesDisplay.setAttribute('id', 'pages-display')
        let deleteBook = createDeleteButton()
        let checkContainer = createCheckContainer()
         

        nameDisplay.textContent = book.name
        authorDisplay.textContent = 'Author: ' + book.author
        pagesDisplay.textContent = 'pages: ' + book.pages
        
        
       
        
        
        bookDisplayed.append(nameDisplay,authorDisplay,pagesDisplay,checkContainer,deleteBook, editBtn)
        bookDisplayed.classList.add('cards')
      
        cardContainer.appendChild(bookDisplayed)
    
}

function createEditButton(){
    let editBtn = document.createElement('button')
    let modal = document.querySelector('#new-book-modal')

    editBtn.textContent = 'edit'
    editBtn.setAttribute('id', 'edit-btn')
    editBtn.addEventListener('click', (e) =>{
        let editIndex = e.target.closest('.cards').dataset.index
        bookName.value = e.target.closest('.cards').childNodes[0].innerHTML
        openModal(modal)
        

    })

    return editBtn
}

function createCheckContainer(){
    let checkContainer = document.createElement('div')
    let isReadDisplay = document.createElement('input')
    let checkboxLabel = document.createElement('label')
    
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

    return checkContainer;

}

function createDeleteButton (){
    deleteButton = document.createElement('button')
    

    deleteButton.textContent = 'delete'
    deleteButton.setAttribute('id', 'delete-button')
    deleteButton.addEventListener('click', (e)=>{
        let deleteIndex = e.target.closest('.cards').dataset.index
        document.querySelector(`[data-index="${deleteIndex}"]`).remove()
        myLibrary.splice(deleteIndex,1)
        updateIndex(deleteIndex)
        console.log(myLibrary)
    })
    return deleteButton;
}

function updateIndex(index){
    let allBookCards = document.querySelectorAll('.cards')
    

    for(let i=index; i<allBookCards.length;i++){
        if(index==allBookCards.length){
            return;
        }
        allBookCards[i].setAttribute('data-index', `${i}`)
        console.log(i);
    }

}

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


// function deleteFromLibrary(index){
//     document.querySelector(`[data-index="${index}"]`).remove()
        

    
// }