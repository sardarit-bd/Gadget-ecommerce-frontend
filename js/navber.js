
let productsection = document.querySelector('.products-section');
let megamenu = document.querySelector('.mega-menu');
const navbar = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');



let navitem_product = document.querySelector('.navitem_product');



let width = window.innerWidth;
window.addEventListener('resize', (e) => {
    e.preventDefault();
    width = window.innerWidth;
})

if (width < 991) {
    navitem_product.addEventListener('click', (e) => {
        megamenu.classList.toggle('active');
    })
}





navbar.addEventListener("click", () => {
    navMenu.classList.toggle('showNav');
    navbar.classList.toggle('showNavActive');


    if (navbar.classList.contains('showNavActive')) {
        navbar.innerHTML = '✚';
    } else {
        navbar.innerHTML = "☰";
    }
})


