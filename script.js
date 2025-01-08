const globalHeader = document.querySelector('.global-header')
const menuItems = document.querySelectorAll('.nav-menu li')
const courses = document.getElementById('courses')
const dropdown = document.querySelector('.sub-nav')
const loginBtn = document.querySelector('.header-btn')
const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup-content')
const closePopupBtn = document.querySelector('.popup i')
const loginForm = document.querySelector('#login-form')
const recaptcha = document.querySelector('.g-recaptcha')
const hamburgerIcon = document.querySelector('.hamburger-menu .open-menu')
const hamburgerCloseIcon = document.querySelector('.hamburger-menu .close-menu')
const navbar = document.querySelector('.nav')
const navbarDropdown = document.querySelector('.menu-item-has-children')
const container = document.querySelector('.container')
const userIcon = document.querySelector('.fa-user-circle')


// Functions

function showError(element, errorText) {
    element.parentElement.classList.add('error')
    element.parentElement.querySelector('small').innerText = errorText
    return false
}

function checkRecaptcha() {
    let response = grecaptcha.getResponse()
    if (response.length === 0) {
        showError(recaptcha, 'من ربات نیستم را تیک بزنید')
    } else {
        recaptcha.parentElement.querySelector('small').innerText = ''
        popup.style.display = 'none'
        loginBtn.querySelector('span').innerText = 'حساب کاربری'
    }
}

function validateLoginForm() {
    const emailField = document.getElementById('email')
    const passwordField = document.getElementById('password')
    const email = emailField.value.trim()
    const password = passwordField.value.trim()
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.length === 0) {
        showError(emailField, "ایمیل نباید خالی باشد")
    } else if (!emailPattern.test(email)) {
        showError(emailField, "ایمیل نامعتبر است")
    } else {
        emailField.parentElement.classList.remove('error')
        emailField.parentElement.classList.add('success')
    }
    if (password.length === 0) {
        showError(passwordField, "رمز عبور نباید خالی باشد")
    } else if (password.length < 6) {
        showError(passwordField, "رمز عبور باید حداقل 6 کاراکتر باشد")
    } else {
        passwordField.parentElement.className = "form-control success"
    }

    let condition1 = emailField.parentElement.classList.contains('success')
    let condition2 = passwordField.parentElement.classList.contains('success')
    if (condition1 && condition2) {
        checkRecaptcha()
    }


}

function toggleNavbarDropdown() {
    const iElement = this.querySelector('i')
    const ulElement = this.querySelector('ul')

    if (iElement.className === "fa fa-angle-left") {
        iElement.className = "fa fa-angle-down"
    } else {
        iElement.className = "fa fa-angle-left"
    }

    ulElement.classList.toggle('active')
    this.classList.toggle('active')
    iElement.setAttribute('style', 'position:absolute;left:0;')

}


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
    // showing popup
    if (loginBtn.querySelector('span').innerText === 'ورود و ثبت نام') {
        popup.style.display = 'flex'
        popup.style.opacity = '1'
        document.body.style.overflow = 'hidden'
    }

})

closePopupBtn.addEventListener('click', () => {
    // hiding popup
    popup.style.display = 'none'
    popup.style.opacity = '0'
    document.body.style.overflow = 'visible'
})

popup.addEventListener('click', (ev) => {
    if (!popupContent.contains(ev.target)) {
        // click is outside the "popupContent" and we will hide popup
        popup.style.display = 'none'
        popup.style.opacity = '0'
        document.body.style.overflow = 'visible'
    }
})

loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    validateLoginForm()
})


// navbar
hamburgerIcon.addEventListener('click', () => {
    navbar.classList.add('active')
    hamburgerIcon.style.display = 'none'
    hamburgerCloseIcon.style.display = 'block'
    const navbarWidth = window.getComputedStyle(navbar).getPropertyValue('width')
    globalHeader.style.transform = `translateX(${navbarWidth})`
    container.style.transform = `translateX(${navbarWidth})`
    document.body.style.overflow = 'hidden'

})
hamburgerCloseIcon.addEventListener('click', () => {
    navbar.classList.remove('active')
    hamburgerIcon.style.display = 'block'
    hamburgerCloseIcon.style.display = 'none'
    globalHeader.style.transform = 'translateX(0)'
    container.style.transform = 'translateX(0)'
    document.body.style.overflow = 'visible'
})
navbarDropdown.addEventListener('click', toggleNavbarDropdown)

//top bar
userIcon.addEventListener('click', () => {
    // showing popup
    popup.style.display = 'flex'
    popup.style.opacity = '1'
    document.body.style.overflow = 'hidden'
})

//sticky nav
window.addEventListener('scroll', () => {
    if (window.scrollY >= globalHeader.offsetHeight){
        globalHeader.style.position = 'fixed'
    }else{
        globalHeader.style.position = 'relative'
    }
})
