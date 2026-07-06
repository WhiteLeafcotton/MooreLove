const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // If nav hits the top, pin it
    if (navWrapper.getBoundingClientRect().top <= 0) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Bar animation
const bar = document.getElementById('activeBar');
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
