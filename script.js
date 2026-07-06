const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Pins navigation when hero scrolls out of view
    if (window.scrollY > (window.innerHeight * 0.85)) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
