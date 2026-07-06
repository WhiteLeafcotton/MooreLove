const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // If scroll position is greater than the hero height (set to 100vh)
    if (window.scrollY > window.innerHeight) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
