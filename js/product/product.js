
class ProductPageCarousel {
    constructor(root) {
        this.root = root;
        this.slides = root.querySelectorAll(".productpage_carousel_slide");
        this.dots = root.querySelectorAll(".productpage_dot");
        this.prevBtn = root.querySelector(".productpage_carousel_arrow.productpage_prev");
        this.nextBtn = root.querySelector(".productpage_carousel_arrow.productpage_next");

        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000;
        this.pauseDelay = 8000;

        this.init();
    }

    init() {
        if (!this.slides.length) return;

        // Ensure exactly one active at start
        this.slides.forEach((s, i) => s.classList.toggle("active", i === 0));
        this.dots.forEach((d, i) => d.classList.toggle("active", i === 0));

        this.prevBtn?.addEventListener("click", () => this.prevSlide());
        this.nextBtn?.addEventListener("click", () => this.nextSlide());
        this.dots.forEach((dot, i) => dot.addEventListener("click", () => this.goToSlide(i)));

        // Pause on hover
        this.root.addEventListener("mouseenter", () => this.stopAutoPlay());
        this.root.addEventListener("mouseleave", () => this.startAutoPlay());

        this.startAutoPlay();
    }

    goToSlide(index) {
        // Guard against bad indexes
        if (index < 0 || index >= this.slides.length) return;

        // Remove previous
        this.slides[this.currentSlide]?.classList.remove("active");
        this.dots[this.currentSlide]?.classList.remove("active");

        // Set new
        this.currentSlide = index;
        this.slides[this.currentSlide]?.classList.add("active");
        this.dots[this.currentSlide]?.classList.add("active");

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
    // 1) Init the HERO / PRODUCT PAGE carousel
    const heroRoot = document.querySelector('.productpage_carousel_container');
    if (heroRoot) new ProductPageCarousel(heroRoot);

    // 2) Init the FEATURES Swiper (your other carousel) — no early return here
    const features = document.querySelector('.productpage_features_swiper');
    if (features && typeof Swiper !== 'undefined') {

        // Destroy previous instance if hot reloading
        if (features._swiper) {
            features._swiper.destroy(true, true);
            features._swiper = null;
        }

        // Use element refs for pagination/nav so it's scoped to this slider
        const paginationEl = features.querySelector('.productpage_swiper_pagination');
        const nextEl = features.querySelector('.productpage_swiper_button_next');
        const prevEl = features.querySelector('.productpage_swiper_button_prev');

        features._swiper = new Swiper(features, {
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
            pagination: paginationEl ? { el: paginationEl, clickable: true } : undefined,
            navigation: (nextEl && prevEl) ? { nextEl, prevEl } : undefined,
            keyboard: { enabled: true, onlyInViewport: true },
            grabCursor: true,
            a11y: true
        });
    }
});








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
            640: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1300: { slidesPerView: 3.3, spaceBetween: 20 },
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
            nextEl: ".landing_arrow_right",
            prevEl: ".landing_arrow_left",
        },
        keyboard: { enabled: true, onlyInViewport: true },
        grabCursor: true,
        a11y: true
    });

    // keep a reference to avoid duplicate inits later (optional)
    container._swiper = swiper;
});
