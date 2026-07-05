const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');
const container = document.getElementById('navContainer');

// Trigger transition when scrolled
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navWrapper.classList.add('fixed-top');
        heroContent.classList.add('faded');
    } else {
        navWrapper.classList.remove('fixed-top');
        heroContent.classList.remove('faded');
    }
});

/**
 * Updates the hero background, title, and CTA button.
 * Calculates bar position relative to the container.
 */
function updateContent(item) {
    // Update visual assets
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    // Calculate bar position
    // We use getBoundingClientRect relative to the container to keep it responsive
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate center-to-center offset
    const itemCenter = itemRect.left + (itemRect.width / 2);
    const containerCenter = containerRect.left + (containerRect.width / 2);
    const offset = itemCenter - containerCenter;
    
    // Apply position
    const barWidth = 80;
    bar.style.left = `calc(50% + ${offset}px - ${barWidth / 2}px)`;
}

// Attach event listeners to nav items
items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// Initialize the first item on load
if (items.length > 0) {
    updateContent(items[0]);
}
