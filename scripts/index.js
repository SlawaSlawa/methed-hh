const optionBtnOrder = document.querySelector('.option__btn_order')
const optionBtnPeriod = document.querySelector('.option__btn_period')
const optionListOrder = document.querySelector('.option__list_order')
const optionListPeriod = document.querySelector('.option__list_period')
const topCityBtn = document.querySelector('.top__city')
const city = document.querySelector('.city')
const cityCloseBtn = document.querySelector('.city__close')
const cityRegionList = document.querySelector('.city__region-list')
const overlayVacancy = document.querySelector('.overlay_vacancy')
const resultList = document.querySelector('.result__list')
const formSearch = document.querySelector('.bottom__search')
const found = document.querySelector('.found')

const getData = ({search, id} = {}) => {
    if (search) {
        return fetch(`http://localhost:3000/api/vacancy?search=${search}`)
                        .then(response => response.json())
    }
    return fetch(`http://localhost:3000/api/vacancy/${id ? id : ''}`)
                        .then(response => response.json())
}


const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

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
    resultList.textContent = ''
    data.forEach(item => {
        resultList.append(createCard(item))
    })
}

const optionHandler = () => {
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
}

const cityHandler = () => {
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
}

const createModal = (data) => {
    const {
        address,
        compensation,
        description,
        employer,
        employment,
        experience,
        skills,
        title,
    } = data

    const modal = document.createElement('div')
    modal.classList.add('modal')

    const closeButtonElem = document.createElement('button')
    closeButtonElem.classList.add('modal__close')
    closeButtonElem.textContent = '✕'

    const titleElem = document.createElement('h2')
    titleElem.classList.add('modal__title')
    titleElem.textContent = title

    const compensationElem = document.createElement('p')
    compensationElem.classList.add('modal__compensation')
    compensationElem.textContent = compensation

    const employerElem = document.createElement('p')
    employerElem.classList.add('modal__employer')
    employerElem.textContent = employer

    const addressElem = document.createElement('p')
    addressElem.classList.add('modal__address')
    addressElem.textContent = address

    const experienceElem = document.createElement('p')
    experienceElem.classList.add('modal__experience')
    experienceElem.textContent = experience

    const employmentElem = document.createElement('p')
    employmentElem.classList.add('modal__employment')
    employmentElem.textContent = employment

    const descriptionElem = document.createElement('p')
    descriptionElem.classList.add('modal__description')
    descriptionElem.textContent = description

    const skillsElem = document.createElement('div')
    skillsElem.classList.add('modal__skills', 'skills')

    const skillsTitleElem = document.createElement('h3')
    skillsTitleElem.classList.add('skills__title')
    skillsTitleElem.textContent = 'Подробнее:'

    const skillsListElem = document.createElement('ul')
    skillsListElem.classList.add('skills__list')

    skills.forEach(skill => {
        const skillsItemElem = document.createElement('li')
        skillsItemElem.classList.add('skills__item')
        skillsItemElem.textContent = skill
        skillsListElem.append(skillsItemElem)
    })

    skillsElem.append(skillsTitleElem, skillsListElem)

    const submitButtonElem = document.createElement('button')
    submitButtonElem.classList.add('modal__response')
    submitButtonElem.textContent = 'Отправить резюме'

    modal.append(
        closeButtonElem,
        titleElem,
        compensationElem,
        employerElem,
        addressElem,
        experienceElem,
        employmentElem,
        descriptionElem,
        skillsElem,
        submitButtonElem
    )

    return modal
}

const modalHandler = () => {
    let modal = null
    resultList.addEventListener('click', async (evt) => {
        const target = evt.target
        if (target.dataset.vacancy) {
            evt.preventDefault()
            overlayVacancy.classList.add('overlay_active')
            const data = await getData({id: target.dataset.vacancy})
            modal = createModal(data)
            overlayVacancy.append(modal)
        }
    })
    
    overlayVacancy.addEventListener('click', (evt) => {
        const target = evt.target
    
        if (target.classList.contains('overlay_vacancy') ||
            target.classList.contains('modal__close')) {
            overlayVacancy.classList.remove('overlay_active')
        }
    })
}

const searchHandler = () => {
    formSearch.addEventListener('submit', async (evt) => {
        evt.preventDefault()
        const textSearch = formSearch.search.value
        
        if (textSearch.length > 2) {
            formSearch.search.style.borderColor = ''
    
            const data = await getData({search: textSearch})
            renderCards(data)
            found.innerHTML = `${declOfNum(data.length, ['вакансия', 'вакансии', 'вакансий'])} &laquo;${textSearch}&raquo;`
            formSearch.reset()
        } else {
            formSearch.search.style.borderColor = 'red'
            setTimeout(() => {
                formSearch.search.style.borderColor = ''
            }, 2000)
        }
    })
}

const init = async () => {
    const data = await getData()
    
    renderCards(data)
    optionHandler()
    cityHandler()
    modalHandler()
    searchHandler()
}



init()
