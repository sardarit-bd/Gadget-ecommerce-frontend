
let productsection = document.querySelector('.products-section');
let megamenu = document.querySelector('.mega-menu');
const navbar = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
let navitem_product = document.querySelector('.navitem_product');
const transparentDiv = document.querySelector('.transparentdiv');





/********** for main anvigatio bar ***********/
navbar.addEventListener("click", () => {
    navMenu.classList.toggle('showNav');
    navbar.classList.toggle('showNavActive');


    if (navbar.classList.contains('showNavActive')) {
        navbar.innerHTML = '✚';
    } else {
        navbar.innerHTML = "☰";
    }
})





/************* for maga menu open **************/
let width = window.innerWidth;

const handleResize = () => {
    width = window.innerWidth;
};


// Update width on resize
window.addEventListener('resize', handleResize);






navitem_product.addEventListener('click', () => {

    if (width < 991) {

        console.log('clieck');

        megamenu.classList.toggle('pNavactive');

    } else {
        return;
    }
});


navitem_product.addEventListener('mouseenter', () => {

    if (width > 991) {
        megamenu.style.display = 'flex';
        megamenu.style.flexDirection = 'column';
        megamenu.style.animation = 'fadeIn 0.3s ease';
        transparentDiv.style.width = '100%';
    } else {
        return;
    }

});


navitem_product.addEventListener('mouseleave', () => {

    if (width > 991) {
        megamenu.style.display = 'none';
        transparentDiv.style.width = '0%';
    } else {
        return;
    }

});













