const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    // Pin navigation when it hits the top of the screen
    if (navWrapper.getBoundingClientRect().top <= 0) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Bar hover animation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
