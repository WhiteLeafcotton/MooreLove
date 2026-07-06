const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    const rect = navWrapper.getBoundingClientRect();
    const scrollY = window.scrollY;

    // If we have scrolled past the initial position (top > 0)
    if (scrollY > 50 && rect.top > 0) {
        navWrapper.classList.add('hidden');
        navWrapper.classList.remove('pinned');
    } 
    // If it hits the top of the viewport
    else if (rect.top <= 0) {
        navWrapper.classList.add('pinned');
        navWrapper.classList.remove('hidden');
    } 
    // Default resting state at the top
    else {
        navWrapper.classList.remove('hidden', 'pinned');
    }
});

// Hover animation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
