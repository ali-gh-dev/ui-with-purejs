// animation border-bottom (for header items)

let menuItems = document.querySelectorAll('.nav-menu li')
let span = document.createElement('span')
span.classList.add('highlight')
document.body.appendChild(span)
menuItems.forEach(item => {
    item.addEventListener('mouseenter', (ev) => {
        let itemCoordinates = ev.target.getBoundingClientRect()
        let {left,width,bottom} = itemCoordinates
        span.style.width = `${width}px`
        span.style.transform = `translate(${left}px,${bottom}px)`
    })
})


// dropdown (sub-nav)
const courses = document.getElementById('courses')
const dropdown = document.querySelector('.sub-nav')

courses.addEventListener('mouseover',()=>{
    dropdown.style.display = 'flex'
})
dropdown.addEventListener('mouseleave',()=>{
    dropdown.style.display = 'none'
})
