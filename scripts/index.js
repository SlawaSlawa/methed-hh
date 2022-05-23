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