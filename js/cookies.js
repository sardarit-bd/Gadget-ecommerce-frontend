const cookie_popup = document.querySelector('.cookie_popup');
const Accept = document.getElementById('Accept');
const reject = document.getElementById('reject');
const Customize = document.getElementById('Customize');





// dom content loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        cookie_popup.style.display = 'flex';
    }, 2000);
});



Accept.addEventListener('click', () => {
    cookie_popup.style.display = 'none';
});


reject.addEventListener('click', () => {
    cookie_popup.style.display = 'none';
});


Customize.addEventListener('click', () => {
    cookie_popup.style.display = 'none';
});