
const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')
const progress = document.querySelector('#progress')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)

const APP_TITLE = document.title

const technologies =[
    {title: 'HTML', description: 'HTML Text', type: 'html', done: true},
    {title: 'CSS', description: 'CSS Text', type: 'css', done: false},
    {title: 'JavaScript', description: 'JavaScript Text', type: 'js', done: false},
    {title: 'Git', description: 'Git Text', type: 'git', done: false},
    {title: 'React', description: 'React Text', type: 'react', done: false}
]

function openCard(event) {
    const data = event.target.dataset
    const tech = technologies.find(t => t.type === data.type)
    if(!tech) return

    openModal('<h1>TEST</h1>', tech.title)
}

function openModal(html, title = APP_TITLE) {
    document.title = `${title} | ${APP_TITLE}`
    modal.classList.add('open')
}

function closeModal() {
    modal.classList.remove('open')
}

function init() {
    renderCards()
    renderProgress()
}

function renderCards() {
    if (technologies.length === 0) {
    content.innerHTML = '<p class="empty">No technologies added. Add the first one.</p>'
} else {
    let html = ''
    for (let i = 0; i < technologies.length; i++) {
        const tech = technologies[i]
        html += toCard(tech)
    }
    content.innerHTML = html

    // Альтернатіва else:
    // content.innerHTML = technologies.map(toCard).join('')
}
}

function renderProgress() {
    const percent = computeProgressPercent()

    let background 

    if (percent <= 30) {
        background = '#E75A5A'
    } else if (percent > 30 && percent < 70) {
        background = ' #F99415'
    } else {
        background = '#73BA3C'
    }
    
    progress.style.background = background
    progress.style.width = percent + '%'
    progress.textContent = percent ? percent + '%' : ''
}

function computeProgressPercent() {

    if (technologies.length === 0) {
        return 0 
    }

    let doneCout = 0
    for (let i = 0; i < technologies.length; i++) {
        if (technologies[i].done) doneCout++ 
    }

    return Math.round((100 * doneCout) / technologies.length)
}

function toCard(tech) {
    // Альтернатіва:
    // let doneClass = ''

    // if (tech.done === true) {
    //     doneClass = 'done'
    // } else {
    //     doneClass = ''
    // }
    const doneClass = tech.done ? 'done' : ''

    return ` <div class="card ${doneClass}" data-type="${tech.type}">
    <h3 data-type="${tech.type}">${tech.title}</h3>
    </div> `
}

init()    