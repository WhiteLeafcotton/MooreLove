const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    // We check how far down the page we have scrolled.
    // Adjust '100' to whatever height your hero section is (in pixels)
    // if you want the fade to trigger earlier or later.
    if (window.scrollY > 100) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Hover animation (keep this as is)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
