
const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)

// modal.classList.add('open')

// setTimeout(function () {
//     modal.classList.remove('open')
// }, 2000)

function openCard() {
    modal.classList.add('open')
}

function closeModal() {
    modal.classList.remove('open')
}
    
