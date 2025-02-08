const globalHeader = document.querySelector('.global-header')
const menuItems = document.querySelectorAll('.nav-menu li')
const courses = document.getElementById('courses')
const dropdown = document.querySelector('.sub-nav')
const loginBtn = document.querySelector('.header-btn')
const popup = document.querySelector('.popup')
const popupContent = document.querySelector('.popup-content')
const closePopupBtn = document.querySelector('.popup i')
const loginForm = document.querySelector('#login-form')
// const recaptcha = document.querySelector('.g-recaptcha')
const hamburgerIcon = document.querySelector('.hamburger-menu .open-menu')
const hamburgerCloseIcon = document.querySelector('.hamburger-menu .close-menu')
const navbar = document.querySelector('.nav')
const navbarDropdown = document.querySelector('.menu-item-has-children')
const container = document.querySelector('.container')
const topBar = document.querySelector('.top-bar')
const userIcon = document.querySelector('.fa-user-circle')
const searchIcon = document.querySelector('.top-bar-items i.fa-search ')
const headerRow = document.querySelector('.header-row')
const searchRow = document.querySelector('.search-row')
const searchInput = document.querySelector('.search-row .search-input')
const goToTop = document.querySelector('.go-to-top')
const cartIcon = document.querySelector('a.mini-cart-opener')
const shoppingCartBox = document.querySelector('.shopping-cart-box')
const courseContent = document.querySelector('.course-content')
const courseDetailInfo = document.querySelector('.course-detail-info')
// const courseInfo = document.querySelector('.course-info')

// ================== Functions ==================

function showError(element, errorText) {
    element.parentElement.classList.add('error')
    element.parentElement.querySelector('small').innerText = errorText
    return false
}

// function checkRecaptcha() {
//     let response = grecaptcha.getResponse()
//     if (response.length === 0) {
//         showError(recaptcha, 'من ربات نیستم را تیک بزنید')
//     } else {
//         recaptcha.parentElement.querySelector('small').innerText = ''
//         popup.style.display = 'none'
//         loginBtn.querySelector('span').innerText = 'حساب کاربری'
//     }
// }

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

    // let condition1 = emailField.parentElement.classList.contains('success')
    // let condition2 = passwordField.parentElement.classList.contains('success')
    // i commented this part temporarily (for increasing speed)
    // if (condition1 && condition2) {
    //     checkRecaptcha()
    // }


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


// ================== animation border-bottom (for header items) ==================

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


// ================== dropdown (sub-nav) ==================

courses.addEventListener('mouseover', () => {
    dropdown.style.display = 'flex'
})
dropdown.addEventListener('mouseleave', () => {
    dropdown.style.display = 'none'
})


// ================== login popup(modal) ==================

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


// ================== navbar ==================

hamburgerIcon.addEventListener('click', () => {
    navbar.classList.add('active')
    hamburgerIcon.style.display = 'none'
    hamburgerCloseIcon.style.display = 'block'
    const navbarWidth = window.getComputedStyle(navbar).getPropertyValue('width')
    globalHeader.style.transform = `translateX(${navbarWidth})`
    container.style.transform = `translateX(${navbarWidth})`
    topBar.style.transform = `translateX(${navbarWidth})`
    document.body.style.overflow = 'hidden'

})
hamburgerCloseIcon.addEventListener('click', () => {
    navbar.classList.remove('active')
    hamburgerIcon.style.display = 'block'
    hamburgerCloseIcon.style.display = 'none'
    globalHeader.style.transform = 'translateX(0)'
    container.style.transform = 'translateX(0)'
    topBar.style.transform = 'translateX(0)'
    document.body.style.overflow = 'visible'
})
navbarDropdown.addEventListener('click', toggleNavbarDropdown)

//================== top bar ==================

userIcon.addEventListener('click', () => {
    // showing popup
    popup.style.display = 'flex'
    popup.style.opacity = '1'
    document.body.style.overflow = 'hidden'
})

//================== sticky nav - feature courses - go to top ==================

window.addEventListener('scroll', () => {
    if (window.scrollY >= globalHeader.offsetHeight) {
        globalHeader.style.position = 'fixed'
    } else {
        globalHeader.style.position = 'relative'
    }


    const goToTopOpacity = window.getComputedStyle(goToTop).getPropertyValue('opacity')
    if (window.scrollY > 300) {
        if (goToTopOpacity < 1) {
            goToTop.classList.add('active')
        }
    } else {
        goToTop.classList.remove('active')
    }


    if (window.scrollY > courseDetailInfo.parentElement.offsetTop && window.scrollY < courseContent.offsetHeight + 50) {
        courseDetailInfo.style.position = 'fixed';
        courseDetailInfo.style.left = '50px';
        courseDetailInfo.style.top = '40px';

        courseDetailInfo.parentElement.classList.add('fixed')

    } else if (window.scrollY >= courseContent.offsetHeight + 50) {
        courseDetailInfo.style.position = 'relative';
        courseDetailInfo.parentElement.classList.remove('fixed')
        // courseDetailInfo.style.top = `${courseInfo.offsetHeight - courseDetailInfo.offsetHeight}px`
        courseDetailInfo.parentElement.style.justifyContent = 'space-between'

    } else {
        courseDetailInfo.style.position = 'relative';
        courseDetailInfo.parentElement.classList.remove('fixed')
    }

})

// ================== voice search ==================

searchIcon.addEventListener('click', toggleSearchIcon)

function toggleSearchIcon() {
    if (searchIcon.className === "fa fa-search") {
        searchIcon.className = "fa fa-times"
        headerRow.classList.add('disable')
        searchRow.classList.add('enable')
        // this part works on chrome browser
        // searchRecognition()
    } else {
        searchIcon.className = "fa fa-search"
        headerRow.classList.remove('disable')
        searchRow.classList.remove('enable')
    }
}

// function searchRecognition() {
//     window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     const recognition = new SpeechRecognition()
//     recognition.lang = "fa-IR"
//     recognition.interimResults = true
//     recognition.addEventListener('result', ev => {
//         const transcript = Array.from(ev.results)
//             .map(item => item[0])
//             .map(item => item.transcript)
//             .join("")
//         if (ev.results[0].isFinal) {
//             searchInput.value = transcript
//         }
//     })
//     recognition.addEventListener('end', recognition.start)
//     recognition.start()
// }

// ================== go to top ==================

goToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
})

// ================== shopping cart ==================

const shoppingCartTotal = shoppingCartBox.querySelector('.shopping-cart-total')

const addToCartIcons = document.querySelectorAll('.course .course-thumbnail a.add-to-cart')

cartIcon.addEventListener('click', () => {
    shoppingCartBox.classList.toggle('active')
})


function updateCart() {
    // clearing all previous data
    shoppingCartBox.querySelector('.shopping-cart-items').innerHTML = ""
    // getting data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        for (let item of cart) {
            const newCourse = document.createElement('div')
            newCourse.className = 'shopping-cart-item'
            newCourse.setAttribute('id', item.id)
            newCourse.innerHTML = `
                                <i class="fas fa-times"></i>
                                <img src="${item.imageSrc}" alt="${item.title}">
                                <div class="cart-item-content">
                                    <span class="item-name">${item.title}</span>
                                    <span class="item-price">${item.price} تومان</span>
                                </div>
    `
            shoppingCartBox.querySelector('.shopping-cart-items').appendChild(newCourse)
        }
    }

    let cartItemCloseIcons = shoppingCartBox.querySelectorAll('.shopping-cart-item i.fa-times')
    const itemsPrices = shoppingCartBox.querySelectorAll('.item-price')
    const cartNumber = topBar.querySelector('.cart-number')
    const cartNumberMobile = topBar.querySelector('.top-bar-items-mobile .cart-number')
    const cartNumberNav = navbar.querySelector('.studiare-cart-number')

    // removing item by clicking x (close icon)
    cartItemCloseIcons.forEach(icon => {
        icon.addEventListener('click', (ev) => {
            let cartItem = ev.target.parentElement
            let itemId = cartItem.getAttribute('id')
            cart = cart.filter(item => item.id !== itemId)
            localStorage.setItem('cart', JSON.stringify(cart))
            updateCart()
        })
    })

    // calculating total price
    let sum = 0
    itemsPrices.forEach(item => {
        sum += Number(item.innerText.match(/\d+/))
    })
    shoppingCartTotal.innerText = `${sum} تومان`

    // updating cart number
    cartNumber.innerText = itemsPrices.length
    cartNumberMobile.innerText = itemsPrices.length
    cartNumberNav.innerText = itemsPrices.length
}

updateCart()


addToCartIcons.forEach(icon => {
    icon.addEventListener('click', (ev) => {
        //adding an item to cart
        ev.preventDefault()
        let currentCourse = ev.target.parentElement.parentElement.parentElement
        addToCart(currentCourse)
        updateCart()
    })
})

function addToCart(course) {
    const courseId = Math.floor(Math.random() * 1000)
    const imageSrc = course.querySelector('img').src
    const title = course.querySelector('.course-content .course-title a').innerText
    let price = course.querySelector('.course-content .course-price').innerText
    if (price === "رایگان") {
        price = 0
    } else {
        price = Number(price)
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCourseObj = {'id': `id-${courseId}`, 'imageSrc': imageSrc, 'title': title, 'price': price}
    cart.push(newCourseObj)
    localStorage.setItem('cart', JSON.stringify(cart))
}

// ================== magnifier ==================

/* magnifiy */
(function(){
    const picCourse = document.querySelector('.course-info .pic-course')
    const img = picCourse.querySelector('img')
    const glass = document.createElement('div')
    const glassDimensions = 250;
    let isVisible = false;

    glass.classList.add('glass');
    glass.style.width = `${glassDimensions}px`
    glass.style.height = `${glassDimensions}px`
    glass.style.backgroundImage = `url(${img.src})`
    picCourse.append(glass)

    img.addEventListener('mouseover',function(){
        glass.style.display = 'block'
        isVisible = true
    })
    img.addEventListener('mouseout',function(){
        glass.style.display = 'none'
        isVisible = false
    })
    picCourse.addEventListener('mousemove',function(evt){
        if(isVisible){
            const mouseX = evt.clientX
            const mouseY = evt.clientY;
            const imgCoordinates = img.getBoundingClientRect();
            const{left,top} = imgCoordinates;
            //console.log(left,top)
            const bgX = 100 *(mouseX -left)/img.offsetWidth;
            const bgY = 100 *(mouseY -top)/img.offsetHeight;
            glass.style.left = `${mouseX -left-glassDimensions/2}px`
            glass.style.top = `${mouseY -top-glassDimensions/2}px`
            glass.style.backgroundPosition = `${bgX}% ${bgY}%`

        }
    })
})();
/* magnifiy */
