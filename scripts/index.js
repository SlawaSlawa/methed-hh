const optionBtnOrder = document.querySelector('.option__btn_order')
const optionBtnPeriod = document.querySelector('.option__btn_period')
const optionListOrder = document.querySelector('.option__list_order')
const optionListPeriod = document.querySelector('.option__list_period')

optionBtnOrder.addEventListener('click', () => {
    optionListPeriod.classList.remove('option__list_active')
    optionListOrder.classList.toggle('option__list_active')
})

optionBtnPeriod.addEventListener('click', () => {
    optionListOrder.classList.remove('option__list_active')
    optionListPeriod.classList.toggle('option__list_active')
})

optionListOrder.addEventListener('click', (evt) => {
    const target = evt.target

    if (target.classList.contains('option__item')) {
        optionBtnOrder.textContent = target.textContent
        optionListOrder.querySelectorAll('.option__item').forEach(li => {
            li.classList.remove('option__item_active')
        }) 
        target.classList.add('option__item_active')
        optionListOrder.classList.remove('option__list_active')
    }
})

optionListPeriod.addEventListener('click', (evt) => {
    const target = evt.target

    if (target.classList.contains('option__item')) {
        optionBtnPeriod.textContent = target.textContent
        optionListPeriod.querySelectorAll('.option__item').forEach(li => {
            li.classList.remove('option__item_active')
        }) 
        target.classList.add('option__item_active')
        optionListPeriod.classList.remove('option__list_active')
    }
})

// Change City

const topCityBtn = document.querySelector('.top__city')
const city = document.querySelector('.city')
const cityCloseBtn = document.querySelector('.city__close')
const cityRegionList = document.querySelector('.city__region-list')

topCityBtn.addEventListener('click', () => {
    city.classList.toggle('city_active')
})

cityCloseBtn.addEventListener('click', () => {
    city.classList.remove('city_active')
})

cityRegionList.addEventListener('click', (evt) => {
    const target = evt.target
    
    if (target.classList.contains('city__link')) {
        topCityBtn.textContent = target.textContent
        city.classList.remove('city_active')
    }

})

// Modal window

const overlayVacancy = document.querySelector('.overlay_vacancy')
const resultList = document.querySelector('.result__list')

resultList.addEventListener('click', (evt) => {
    const target = evt.target
    if (target.dataset.vacancy) {
        evt.preventDefault()
        overlayVacancy.classList.add('overlay_active')
    }
})

overlayVacancy.addEventListener('click', (evt) => {
    const target = evt.target

    if (target.classList.contains('overlay_vacancy') ||
        target.classList.contains('modal__close')) {
        overlayVacancy.classList.remove('overlay_active')
    }
})

// Render cards

const createCard = (vacancy) => {
    const {
        id,
        title,
        compensation,
        workSchedule,
        address,
        date,
        description,
        employer,
    } = vacancy
    const card = document.createElement('li')
    card.classList.add('result__item')

    card.insertAdjacentHTML('afterbegin', `
            <article class="vacancy">
                <h2 class="vacancy__title">
                    <a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
                </h2>
                <p class="vacancy__compensation">${compensation} руб.</p>
                <p class="vacancy__work-schedule">${workSchedule}</p>
                <div class="vacancy__employer">
                    <p class="vacancy__employer-title">${employer}</p>
                    <p class="vacancy__employer-address">${address}</p>
                </div>
                <p class="vacancy__description">${description}</p>
                <p class="vacancy__date">
                    <time datetime="${date}">${date}</time>
                </p>
                <div class="vacancy__wrapper-btn">
                    <a class="vacancy__response vacancy__open-modal" href="#" data-vacancy="${id}">Откликнуться</a>
                    <button class="vacancy__contacts">Показать контакты</button>
                </div>
            </article>
    `)

    return card
}

const renderCards = (data) => {
    console.log(data)
    resultList.textContent = ''
    data.forEach(item => {
        resultList.append(createCard(item))
    })
}

const getData = ({search} = {}) => {
    if (search) {
        return fetch(`http://localhost:3000/api/vacancy?search=${search}`)
                        .then(response => response.json())
    }
    return fetch('http://localhost:3000/api/vacancy/')
                        .then(response => response.json())
}
                        

const init = async () => {
    const data = await getData()
    renderCards(data)
}

// Search

const formSearch = document.querySelector('.bottom__search')

formSearch.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    const textSearch = formSearch.search.value
    
    if (textSearch.length > 2) {
        formSearch.search.style.borderColor = ''

        const data = await getData({search: textSearch})
        renderCards(data)
        formSearch.reset()
    } else {
        formSearch.search.style.borderColor = 'red'
        setTimeout(() => {
            formSearch.search.style.borderColor = ''
        }, 2000)
    }
})



init()
