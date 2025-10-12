// // Carousel functionality
// class Carousel {
//     constructor() {
//         this.slides = document.querySelectorAll(".carousel-slide")
//         this.dots = document.querySelectorAll(".dot")
//         this.prevBtn = document.querySelector(".carousel-arrow.prev")
//         this.nextBtn = document.querySelector(".carousel-arrow.next")
//         this.currentSlide = 0
//         this.autoPlayInterval = null
//         this.autoPlayDelay = 4000
//         this.pauseDelay = 8000

//         this.init()
//     }

//     init() {
//         // Add event listeners for navigation arrows
//         this.prevBtn.addEventListener("click", () => this.prevSlide())
//         this.nextBtn.addEventListener("click", () => this.nextSlide())

//         // Add event listeners for dots
//         this.dots.forEach((dot, index) => {
//             dot.addEventListener("click", () => this.goToSlide(index))
//         })

//         // Start auto-play
//         this.startAutoPlay()

//         // Pause auto-play on hover
//         const container = document.querySelector(".carousel-container")
//         container.addEventListener("mouseenter", () => this.stopAutoPlay())
//         container.addEventListener("mouseleave", () => this.startAutoPlay())
//     }

//     goToSlide(index) {
//         // Remove active class from current slide and dot
//         this.slides[this.currentSlide].classList.remove("active")
//         this.dots[this.currentSlide].classList.remove("active")

//         // Update current slide
//         this.currentSlide = index

//         // Add active class to new slide and dot
//         this.slides[this.currentSlide].classList.add("active")
//         this.dots[this.currentSlide].classList.add("active")

//         // Reset auto-play when manually navigating
//         this.resetAutoPlay()
//     }

//     nextSlide() {
//         const nextIndex = (this.currentSlide + 1) % this.slides.length
//         this.goToSlide(nextIndex)
//     }

//     prevSlide() {
//         const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
//         this.goToSlide(prevIndex)
//     }

//     startAutoPlay() {
//         this.stopAutoPlay()
//         this.autoPlayInterval = setInterval(() => {
//             this.nextSlide()
//         }, this.autoPlayDelay)
//     }

//     stopAutoPlay() {
//         if (this.autoPlayInterval) {
//             clearInterval(this.autoPlayInterval)
//             this.autoPlayInterval = null
//         }
//     }

//     resetAutoPlay() {
//         this.stopAutoPlay()
//         setTimeout(() => {
//             this.startAutoPlay()
//         }, this.pauseDelay)
//     }
// }

// // Initialize carousel when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//     new Carousel()
// })





// // Products Page functionality
// document.addEventListener('DOMContentLoaded', function () {
//     // Product filtering
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const productCards = document.querySelectorAll('.product-card');
//     const sortSelect = document.querySelector('.sort-select');
//     const productsGrid = document.getElementById('productsGrid');

//     // Filter functionality
//     filterButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             this.classList.add('active');

//             const filterValue = this.getAttribute('data-filter');
//             productCards.forEach(card => {
//                 if (filterValue === 'all' || card.classList.contains(filterValue)) {
//                     card.style.display = 'block';
//                     card.style.animation = 'fadeIn 0.6s ease';
//                 } else {
//                     card.style.display = 'none';
//                 }
//             });
//         });
//     });

//     // Sort functionality
//     sortSelect.addEventListener('change', function () {
//         const sortValue = this.value;
//         const products = Array.from(productCards);

//         products.sort((a, b) => {
//             const priceA = parseFloat(a.getAttribute('data-price'));
//             const priceB = parseFloat(b.getAttribute('data-price'));

//             switch (sortValue) {
//                 case 'price-low': return priceA - priceB;
//                 case 'price-high': return priceB - priceA;
//                 case 'popular': return Math.random() - 0.5;
//                 default: return 0;
//             }
//         });

//         products.forEach(product => productsGrid.appendChild(product));
//     });

//     // Add to cart functionality
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     const cartCount = document.querySelector('.cart-count');

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const productCard = this.closest('.product-card');
//             const productName = productCard.querySelector('.product-title').textContent;
//             let currentCount = parseInt(cartCount.textContent);
//             cartCount.textContent = ++currentCount;

//             showSuccess(`Added ${productName} to cart!`);
//             this.innerHTML = '<i class="fas fa-check"></i> Added!';
//             this.style.background = '#27ae60';

//             setTimeout(() => {
//                 this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
//                 this.style.background = '';
//             }, 2000);
//         });
//     });

//     // Wishlist functionality
//     const wishlistButtons = document.querySelectorAll('.wishlist');

//     wishlistButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const productCard = this.closest('.product-card');
//             const productName = productCard.querySelector('.product-title').textContent;
//             const icon = this.querySelector('i');
//             if (icon.classList.contains('far')) {
//                 icon.classList.replace('far', 'fas');
//                 icon.style.color = '#e74c3c';
//                 showSuccess(`Added ${productName} to wishlist!`);
//             } else {
//                 icon.classList.replace('fas', 'far');
//                 icon.style.color = '';
//                 showMessage(`Removed ${productName} from wishlist`, 'info');
//             }
//         });
//     });

//     // Compare functionality
//     const compareButtons = document.querySelectorAll('.compare');
//     let comparedProducts = [];

//     compareButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const productCard = this.closest('.product-card');
//             const productName = productCard.querySelector('.product-title').textContent;

//             if (!comparedProducts.includes(productName)) {
//                 if (comparedProducts.length >= 3) {
//                     showError('You can compare up to 3 products at a time');
//                     return;
//                 }
//                 comparedProducts.push(productName);
//                 this.style.background = '#3498db';
//                 this.style.color = 'white';
//                 showSuccess(`Added ${productName} to compare!`);
//             } else {
//                 comparedProducts = comparedProducts.filter(name => name !== productName);
//                 this.style.background = '';
//                 this.style.color = '';
//                 showMessage(`Removed ${productName} from compare`, 'info');
//             }
//             updateCompareBadge();
//         });
//     });

//     function updateCompareBadge() {
//         console.log('Compared products:', comparedProducts);
//     }

//     // Quick view functionality
//     const quickViewButtons = document.querySelectorAll('.quick-view');
//     const quickViewModal = document.getElementById('quickViewModal');
//     const closeQuickView = document.getElementById('closeQuickView');
//     const quickViewContent = document.getElementById('quickViewContent');

//     quickViewButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const productCard = this.closest('.product-card');
//             const productData = getProductData(productCard);
//             showQuickView(productData);
//         });
//     });

//     closeQuickView.addEventListener('click', () => quickViewModal.style.display = 'none');
//     window.addEventListener('click', e => {
//         if (e.target === quickViewModal) quickViewModal.style.display = 'none';
//     });

//     function getProductData(productCard) {
//         return {
//             title: productCard.querySelector('.product-title').textContent,
//             description: productCard.querySelector('.product-description').textContent,
//             image: productCard.querySelector('.product-image img').src,
//             price: productCard.querySelector('.current-price').textContent,
//             originalPrice: productCard.querySelector('.original-price')?.textContent || '',
//             discount: productCard.querySelector('.discount')?.textContent || '',
//             features: Array.from(productCard.querySelectorAll('.feature')).map(f => f.textContent.trim()),
//             specs: Array.from(productCard.querySelectorAll('.spec')).map(s => ({
//                 label: s.querySelector('.spec-label').textContent,
//                 value: s.querySelector('.spec-value').textContent
//             }))
//         };
//     }

//     function showQuickView(productData) {
//         quickViewContent.innerHTML = `
//             <div class="quick-view-content">
//                 <div class="quick-view-image">
//                     <img src="${productData.image}" alt="${productData.title}">
//                 </div>
//                 <div class="quick-view-details">
//                     <h3>${productData.title}</h3>
//                     <p class="product-description">${productData.description}</p>

//                     <div class="price-section">
//                         <span class="current-price">${productData.price}</span>
//                         ${productData.originalPrice ? `<span class="original-price">${productData.originalPrice}</span>` : ''}
//                         ${productData.discount ? `<span class="discount">${productData.discount}</span>` : ''}
//                     </div>

//                     <div class="features-section">
//                         <h4>Key Features</h4>
//                         <div class="features-grid">
//                             ${productData.features.map(f => `<span class="feature">${f}</span>`).join('')}
//                         </div>
//                     </div>

//                     <div class="specs-section">
//                         <h4>Specifications</h4>
//                         <div class="specs-list">
//                             ${productData.specs.map(s => `
//                                 <div class="spec">
//                                     <span class="spec-label">${s.label}</span>
//                                     <span class="spec-value">${s.value}</span>
//                                 </div>
//                             `).join('')}
//                         </div>
//                     </div>

//                     <div class="quick-view-actions">
//                         <button class="btn btn-outline full-details-btn">
//                             <i class="fas fa-info-circle"></i>
//                             Full Details
//                         </button>
//                         <button class="btn btn-primary add-to-cart-quick">
//                             <i class="fas fa-shopping-cart"></i>
//                             Add to Cart - ${productData.price}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;

//         // Add to Cart button
//         const addToCartQuick = quickViewContent.querySelector('.add-to-cart-quick');
//         addToCartQuick.addEventListener('click', function () {
//             let count = parseInt(cartCount.textContent);
//             cartCount.textContent = ++count;
//             showSuccess(`Added ${productData.title} to cart!`);
//             quickViewModal.style.display = 'none';
//         });

//         // Full Details button redirect
//         const fullDetailsBtn = quickViewContent.querySelector('.full-details-btn');
//         fullDetailsBtn.addEventListener('click', function () {
//             const encodedTitle = encodeURIComponent(productData.title.trim());
//             window.location.href = `/html-assets/product-details.html?product=${encodedTitle}`;
//         });

//         quickViewModal.style.display = 'block';
//     }

//     // Load more functionality
//     const loadMoreBtn = document.getElementById('loadMore');
//     let currentPage = 1;
//     loadMoreBtn.addEventListener('click', function () {
//         this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
//         this.disabled = true;
//         setTimeout(() => {
//             showMessage('More products loaded!', 'info');
//             this.innerHTML = '<i class="fas fa-redo"></i> Load More Products';
//             this.disabled = false;
//             if (++currentPage >= 3) this.style.display = 'none';
//         }, 1500);
//     });

//     // Search functionality
//     const searchIcon = document.querySelector('.fa-search').closest('.nav-icon');
//     searchIcon.addEventListener('click', function (e) {
//         e.preventDefault();
//         const term = prompt('Enter product name to search:');
//         if (term) filterProductsBySearch(term);
//     });

//     function filterProductsBySearch(term) {
//         const search = term.toLowerCase();
//         productCards.forEach(card => {
//             const title = card.querySelector('.product-title').textContent.toLowerCase();
//             const desc = card.querySelector('.product-description').textContent.toLowerCase();
//             card.style.display = (title.includes(search) || desc.includes(search)) ? 'block' : 'none';
//         });
//         showMessage(`Showing results for: ${term}`, 'info');
//     }

//     // Utility functions
//     function showSuccess(msg) { showMessage(msg, 'success'); }
//     function showError(msg) { showMessage(msg, 'error'); }

//     function showMessage(message, type = 'info') {
//         const existing = document.querySelector('.message');
//         if (existing) existing.remove();
//         const el = document.createElement('div');
//         el.className = `message message-${type}`;
//         el.textContent = message;
//         el.style.cssText = `
//             position: fixed; top: 90px; right: 20px;
//             padding: 15px 20px; border-radius: 10px;
//             color: white; font-weight: 500; z-index: 1000;
//             animation: slideInRight 0.3s ease; max-width: 300px;
//             box-shadow: 0 5px 15px rgba(0,0,0,0.2);
//         `;
//         el.style.background = type === 'error' ? '#e74c3c' : type === 'success' ? '#1db954' : '#3498db';
//         document.body.appendChild(el);
//         setTimeout(() => {
//             el.style.animation = 'slideOutRight 0.3s ease';
//             setTimeout(() => el.remove(), 300);
//         }, 5000);
//     }

//     // Add CSS for animations
//     const style = document.createElement('style');
//     style.textContent = `
//         @keyframes slideInRight {
//             from { transform: translateX(100%); opacity: 0; }
//             to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes slideOutRight {
//             from { transform: translateX(0); opacity: 1; }
//             to { transform: translateX(100%); opacity: 0; }
//         }
//         .quick-view-content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
//         .quick-view-image img { width: 100%; border-radius: 10px; }
//         .quick-view-actions { display: flex; gap: 15px; margin-top: 25px; flex-wrap: wrap; }
//         @media (max-width: 768px) {
//             .quick-view-content { grid-template-columns: 1fr; }
//             .quick-view-actions { flex-direction: column; }
//         }
//     `;
//     document.head.appendChild(style);

//     // Product animation delays
//     productCards.forEach((card, i) => card.style.animationDelay = `${i * 0.1}s`);
// });


// // init swiper
// const featuresSwiper = new Swiper('.features-swiper', {
//     // core
//     loop: true,
//     speed: 600,
//     slidesPerView: 1,
//     spaceBetween: 18,

//     // responsive breakpoints
//     breakpoints: {
//         640: {
//             slidesPerView: 1.2,
//             spaceBetween: 18
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 20
//         },
//         1024: {
//             slidesPerView: 3,
//             spaceBetween: 24
//         },
//         1300: {
//             slidesPerView: 3.3,
//             spaceBetween: 26
//         }
//     },

//     // autoplay (optional)
//     autoplay: {
//         delay: 3500,
//         disableOnInteraction: true,
//     },

//     // pagination & navigation
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

//     // accessibility / control
//     keyboard: {
//         enabled: true,
//         onlyInViewport: true,
//     },
//     grabCursor: true,
//     a11y: true
// });



















// ===== Carousel (namespaced) =====
class ProductPageCarousel {
    constructor() {
        this.slides = document.querySelectorAll(".productpage_carousel_slide");
        this.dots = document.querySelectorAll(".productpage_dot");
        this.prevBtn = document.querySelector(".productpage_carousel_arrow.productpage_prev");
        this.nextBtn = document.querySelector(".productpage_carousel_arrow.productpage_next");
        this.container = document.querySelector(".productpage_carousel_container");

        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;
        this.pauseDelay = 8000;

        this.init();
    }
    init() {
        if (!this.slides.length) return;
        this.prevBtn?.addEventListener("click", () => this.prevSlide());
        this.nextBtn?.addEventListener("click", () => this.nextSlide());
        this.dots.forEach((dot, index) => dot.addEventListener("click", () => this.goToSlide(index)));
        this.startAutoPlay();
        this.container?.addEventListener("mouseenter", () => this.stopAutoPlay());
        this.container?.addEventListener("mouseleave", () => this.startAutoPlay());
    }
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove("active");
        this.dots[this.currentSlide].classList.remove("active");
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add("active");
        this.dots[this.currentSlide].classList.add("active");
        this.resetAutoPlay();
    }
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
    stopAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
    }
    resetAutoPlay() {
        this.stopAutoPlay();
        setTimeout(() => this.startAutoPlay(), this.pauseDelay);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Guard: ensure the element exists and Swiper is available
    var container = document.querySelector('.productpage_features_swiper');
    if (!container || typeof Swiper === 'undefined') return;

    // If you happen to hot-reinit, destroy old instance
    if (container._swiper) {
        container._swiper.destroy(true, true);
        container._swiper = null;
    }

    var swiper = new Swiper('.productpage_features_swiper', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 18,
        breakpoints: {
            640: { slidesPerView: 1.2, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1300: { slidesPerView: 3.3, spaceBetween: 2 },
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: true
        },
        pagination: {
            el: '.productpage_swiper_pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.productpage_swiper_button_next',
            prevEl: '.productpage_swiper_button_prev'
        },
        keyboard: { enabled: true, onlyInViewport: true },
        grabCursor: true,
        a11y: true
    });

    // keep a reference to avoid duplicate inits later (optional)
    container._swiper = swiper;
});
