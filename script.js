const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

window.addEventListener('scroll', () => {
    const rect = navWrapper.getBoundingClientRect();
    
    // Pin nav when it reaches the top
    if (rect.top <= 0) {
        navWrapper.classList.add('pinned');
        navWrapper.classList.remove('faded-out');
    } 
    // Fade out if we have started scrolling but haven't reached the top yet
    else if (window.scrollY > 0) {
        navWrapper.classList.add('faded-out');
    } 
    // Reset if at the very top
    else {
        navWrapper.classList.remove('pinned', 'faded-out');
    }
});

// Hover animation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
