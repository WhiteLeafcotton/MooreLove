const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Pins to top when hero is scrolled past
    if (window.scrollY > (window.innerHeight * 0.85)) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
