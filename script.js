const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    // Check if nav has reached top of viewport
    const rect = navWrapper.getBoundingClientRect();
    if (rect.top <= 0) {
        navWrapper.classList.add('pinned');
        heroContent.classList.add('faded');
    } else {
        navWrapper.classList.remove('pinned');
        heroContent.classList.remove('faded');
    }
});

// Bar animation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
