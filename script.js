const navWrapper = document.getElementById('navWrapper');
const bar = document.getElementById('activeBar');

// Toggle 'pinned' class for background blur
window.addEventListener('scroll', () => {
    const rect = navWrapper.getBoundingClientRect();
    if (rect.top <= 0) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});

// Bar animation logic
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const offset = e.currentTarget.offsetLeft + (e.currentTarget.offsetWidth / 2) - (bar.offsetWidth / 2);
        bar.style.left = `${offset}px`;
    });
});
