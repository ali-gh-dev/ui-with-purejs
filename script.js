const menuItems = document.querySelectorAll('.nav-menu li')
const courses = document.getElementById('courses')
const dropdown = document.querySelector('.sub-nav')
const loginBtn = document.querySelector('.header-btn')
const popup = document.querySelector('.popup')
const closePopupBtn = document.querySelector('.popup i')


// animation border-bottom (for header items)
const span = document.createElement('span')
span.classList.add('highlight')
document.body.appendChild(span)
menuItems.forEach(item => {
    item.addEventListener('mouseenter', (ev) => {
        let itemCoordinates = ev.target.getBoundingClientRect()
        let {left, width, bottom} = itemCoordinates
        span.style.width = `${width}px`
        span.style.transform = `translate(${left}px,${bottom}px)`
    })
})


// dropdown (sub-nav)
courses.addEventListener('mouseover', () => {
    dropdown.style.display = 'flex'
})
dropdown.addEventListener('mouseleave', () => {
    dropdown.style.display = 'none'
})


// login popup(modal)
loginBtn.addEventListener('click', () => {
    popup.style.display = 'flex'
    popup.style.opacity = '1'
    document.body.style.overflow = 'hidden'
})

closePopupBtn.addEventListener('click',()=>{
    popup.style.display = 'none'
    popup.style.opacity = '0'
    document.body.style.overflow = 'visible'
})
