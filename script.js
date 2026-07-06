const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');
const container = document.getElementById('navContainer');

let ticking = false;

// 1. Optimized Scroll Logic
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPos = window.scrollY;
            if (scrollPos > 50) {
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
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${item.getAttribute('data-img')}')`;
    
    // Calculate Bar Offset relative to the container
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
    
    // Optional: Store the active item for resizing
    window.lastActiveItem = item;
}

// 3. Add Event Listeners
items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// 4. Handle Resize to keep the bar aligned
window.addEventListener('resize', () => {
    if (window.lastActiveItem) updateContent(window.lastActiveItem);
});

// Initialize on load
updateContent(items[0]);
