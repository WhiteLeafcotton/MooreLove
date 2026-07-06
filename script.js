const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');

let ticking = false;

// 1. Optimized Scroll Logic
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPos = window.scrollY;
            // Trigger transition earlier to avoid jitter at 90vh
            if (scrollPos > (window.innerHeight * 0.1)) {
                navWrapper.classList.add('fixed-top');
                heroContent.classList.add('faded');
            } else {
                navWrapper.classList.remove('fixed-top');
                heroContent.classList.remove('faded');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// 2. Precise Bar Positioning
function updateContent(item) {
    // Update Background Image
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    
    // Calculate Bar Offset accurately
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
    
    window.lastActiveItem = item;
}

// 3. Event Listeners
items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// 4. Robust Resize Handling
window.addEventListener('resize', () => {
    // Use a small timeout to ensure layout has finished recalculating before moving the bar
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        if (window.lastActiveItem) updateContent(window.lastActiveItem);
    }, 150);
});

// Initialize
updateContent(items[0]);
