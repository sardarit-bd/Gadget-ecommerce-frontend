
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');

decreaseBtn.addEventListener('click', function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

increaseBtn.addEventListener('click', function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
});

// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const targetTab = this.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});


// Add to Cart Functionality
const addToCartBtn = document.querySelector('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

addToCartBtn.addEventListener('click', function () {
    const quantity = parseInt(quantityInput.value);
    const amsChecked = document.getElementById('amsSystem').checked;
    const selectedColor = document.querySelector('.color-option.active').getAttribute('data-color');

    // Update cart count
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + quantity;

    // Show confirmation (in a real app, you would add to cart and possibly show a modal)
    showAddToCartConfirmation(quantity, amsChecked, selectedColor);
});

function showAddToCartConfirmation(quantity, amsChecked, color) {
    // Create a simple confirmation message
    const message = `Added ${quantity} X1 Carbon (${color})${amsChecked ? ' with AMS System' : ''} to cart!`;

    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2ecc71;
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transition: all 0.3s;
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


function showWishlistNotification(action) {
    const message = action === 'added' ? 'Added to wishlist!' : 'Removed from wishlist!';
    const bgColor = action === 'added' ? '#3498db' : '#e74c3c';

    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transition: all 0.3s;
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load More Reviews
const loadMoreReviewsBtn = document.querySelector('.load-more-reviews');

loadMoreReviewsBtn.addEventListener('click', function () {
    // In a real application, this would fetch more reviews from a server
    // For this demo, we'll just show an alert
    alert('Loading more reviews... This would fetch additional reviews in a real application.');
});


// Update price when AMS is selected
const amsCheckbox = document.getElementById('amsSystem');
const currentPriceElement = document.querySelector('.current-price');

amsCheckbox.addEventListener('change', function () {
    if (this.checked) {
        // Update price to include AMS
        currentPriceElement.textContent = '$1,848.00';
    } else {
        // Revert to original price
        currentPriceElement.textContent = '$1,499.00';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});








document.addEventListener("DOMContentLoaded", function () {

    const mainImage = document.getElementById("mainImage");
    const thumbs = document.querySelectorAll(".gallery-thumbs .thumb");


    console.log(thumbs);


    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", function () {
            // Get the image URL from data attribute
            const newSrc = this.getAttribute("data-image");


            console.log(newSrc);


            // Update main image
            mainImage.src = newSrc;

            // Update active class
            thumbs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");
        });
    });
});







