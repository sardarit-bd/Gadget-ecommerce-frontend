// Learn Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const learnLeft = document.querySelector('.learn-left');
    const learnRight = document.querySelector('.learn-right');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('learn-left')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('learn-right')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, observerOptions);
    // Reset animations for observer
    if (learnLeft) {
        learnLeft.style.opacity = '0';
        learnLeft.style.transform = 'translateX(-30px)';
        learnLeft.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(learnLeft);
    }
    if (learnRight) {
        learnRight.style.opacity = '0';
        learnRight.style.transform = 'translateX(30px)';
        learnRight.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(learnRight);
    }
    // Add click handlers for review cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add active state
            this.classList.add('active');
            // Remove active state from other cards
            reviewCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(29, 185, 84, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2 - size / 2;
            const y = rect.height / 2 - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    // Add click handlers for learning cards
    const learnLinks = document.querySelectorAll('.learn-link, .secondary-link');
    learnLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            // Simulate navigation (replace with actual navigation)
            console.log('Navigating to:', this.getAttribute('href'));
        });
    });
    // Add CSS for active state and ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .review-card.active {
            border-color: #1DB954;
            background: #F8FFF8;
        }
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        .learn-link, .secondary-link {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}); 