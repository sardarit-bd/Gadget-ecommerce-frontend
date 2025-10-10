// Video Swiper
const videoSwiper = new Swiper(".video-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: {
        enabled: true,
        momentum: true,
    },
    keyboard: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        320: { slidesPerView: 1.1 },
        576: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 3.5 },
    },
});
