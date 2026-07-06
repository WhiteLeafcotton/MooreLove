const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Get distance of nav relative to top of viewport
    const rect = navWrapper.getBoundingClientRect();
    
    // Once the nav hits the top, pin it
    if (rect.top <= 0) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Bar animation logic
const bar = document.getElementById('activeBar');
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
