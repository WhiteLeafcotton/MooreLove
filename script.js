const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    // Pin nav when it reaches the top of the viewport
    if (navWrapper.getBoundingClientRect().top <= 0) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Hover animation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
