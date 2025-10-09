// FAQ Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const faqItems = document.querySelectorAll('.faq-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    // Reset animations for observer
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    // FAQ toggle functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        question.addEventListener('click', function () {
            // Toggle active class
            const isActive = item.classList.contains('active');
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
    // FAQ hover image change
    const faqImg = document.querySelector('.faq-img');
    const faqItemsList = document.querySelectorAll('.faq-item');

    faqItemsList.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const newImg = item.getAttribute('data-img');
            if (newImg) {
                faqImg.style.opacity = 0;
                setTimeout(() => {
                    faqImg.src = newImg;
                    faqImg.style.opacity = 1;
                }, 200);
            }
        });
        // Optional: Reset to default image when mouse leaves
        item.addEventListener('mouseleave', () => {
            faqImg.style.opacity = 0;
            setTimeout(() => {
                faqImg.src = 'https://cdn1.bambulab.com/home/blog/5.jpeg';
                faqImg.style.opacity = 1;
            }, 200);
        });
    });
    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});