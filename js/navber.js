console.log('connected');

let productsection = document.querySelector('.products-section');
let megamenu = document.querySelector('.mega-menu');

productsection.addEventListener('onmouseleave', (e) => {
    megamenu.style.display = 'none';
})


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



console.log(width);
