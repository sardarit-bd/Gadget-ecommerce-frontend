const slider = document.querySelector('.video-slider');
document.getElementById('nextBtn').onclick = () => slider.scrollBy({ left: 350, behavior: 'smooth' });
document.getElementById('prevBtn').onclick = () => slider.scrollBy({ left: -350, behavior: 'smooth' });