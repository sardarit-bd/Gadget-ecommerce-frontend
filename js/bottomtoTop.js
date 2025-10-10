// Get the button
const backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when user scrolls down 200px
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// Scroll smoothly to top when clicked
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
