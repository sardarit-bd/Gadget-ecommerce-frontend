const sideTransparentSpace = document.querySelector('.sideTransparentSpace');
const sidecart_popup = document.querySelector('.sidecart_popup');
const cartIconsWrper = document.querySelector('.cartIconsWrper');
const smallscreen_cartIconsWrper = document.querySelector('.smallscreen_cartIconsWrper');
const crossbtnWrper = document.querySelector('.crossbtnWrper');


sideTransparentSpace.addEventListener('click', () => {
    sidecart_popup.style.display = 'none';
});

crossbtnWrper.addEventListener('click', () => {
    sidecart_popup.style.display = 'none';
});

cartIconsWrper.addEventListener('click', () => {
    sidecart_popup.style.display = 'flex';
});

smallscreen_cartIconsWrper.addEventListener('click', () => {
    sidecart_popup.style.display = 'flex';
});










