/**
 * HBCR Senior Living - Navigation and Hero Logic
 */

const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');

// 1. Optimized Scroll Logic
// Uses requestAnimationFrame for smooth performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollPos = window.scrollY;
            
            // Trigger threshold: when the nav reaches the top of the viewport
            // We use 80px offset to allow for smooth transition
            if (scrollPos > (hero.offsetHeight - 80)) {
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
// Updates the background image and moves the active underline bar
function updateContent(item) {
    // Update Background Image
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    
    // Calculate Bar Offset accurately based on item width and position
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
    
    // Store reference to last active item for resizing
    window.lastActiveItem = item;
}

// 3. Event Listeners
items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// 4. Robust Resize Handling
// Uses a timer to debounce the event, ensuring calculations occur after resize stops
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        if (window.lastActiveItem) {
            updateContent(window.lastActiveItem);
        }
    }, 150);
});

// Initialize the hero state on page load
if (items.length > 0) {
    updateContent(items[0]);
}
