const modal = document.querySelector('#modal')
const content = document.querySelector('#content')
const backdrop = document.querySelector('#backdrop')
const progress = document.querySelector('#progress')
const form = document.querySelector('#form')

content.addEventListener('click', openCard)
backdrop.addEventListener('click', closeModal)
modal.addEventListener('change', toggleTech)
form.addEventListener('submit', createTech)

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

    openModal(toModal(tech), tech.title)
}

function toModal(tech) {
    const checked = tech.done ? 'checked' : ''
    return `
       <h2>${tech.title}</h2>
        <p>${tech.description}</p>

        <hr>

        <div>
            <input type="checkbox" id="done" ${checked} data-type="${tech.type}">
            <label for="done">Learned</label>
        </div>
    `
}

function toggleTech(event) {
    const type = event.target.dataset.type
    const tech = technologies.find(t => t.type === type)
    tech.done = event.target.checked

    init()
}

function openModal(html, title = APP_TITLE) {
    document.title = `${title} | ${APP_TITLE}`
    modal.innerHTML = html
    modal.classList.add('open')
}

function closeModal() {
    document.title = APP_TITLE
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

function isInvalid(title, description) {
    return !title.value || !description.value
}

function createTech(event) {
    event.preventDefault()

    // const title = event.target.title
    // const description = event.target.description

    const {title, description} = event.target

    if (isInvalid(title, description)) {
        if (!title.value) title.classList.add('invalid')
        if (!description.value) description.classList.add('invalid')

        setTimeout(() => {
            title.classList.remove('invalid')
            description.classList.remove('invalid')
        }, 2000)

       return
    }

    const newTech = {
        title: title.value,
        description: description.value,
        done: false,
        type: title.value.toLowerCase()
    }
    
    technologies.push(newTech)
    title.value = ''
    description.value = ''
    init()
}


init()    