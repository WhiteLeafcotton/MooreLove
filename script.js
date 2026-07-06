const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Threshold set to 100px to trigger the sticky background transition
    if (window.scrollY > 100) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
