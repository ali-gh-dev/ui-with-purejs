const menuItems = document.querySelectorAll('.nav-menu li')
const courses = document.getElementById('courses')
const dropdown = document.querySelector('.sub-nav')
const loginBtn = document.querySelector('.header-btn')
const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup-content')
const closePopupBtn = document.querySelector('.popup i')
const loginForm = document.querySelector('#login-form')
const recaptcha = document.querySelector('.g-recaptcha')


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
    if(condition1 && condition2){
        checkRecaptcha()
    }


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
