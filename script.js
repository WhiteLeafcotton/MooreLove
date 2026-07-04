const hero = document.getElementById('hero');
const heroText = document.getElementById('heroText');
const ctaBtn = document.getElementById('ctaBtn');
const activeBar = document.getElementById('activeBar');
const navItems = document.querySelectorAll('.nav-item');

function updateHero(item) {
    // Change background
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${item.getAttribute('data-img')}')`;
    
    // Update text
    heroText.querySelector('h1').innerHTML = item.getAttribute('data-title');
    ctaBtn.innerText = item.getAttribute('data-btn');
    
    // Move Bar
    const leftPos = item.offsetLeft + (item.offsetWidth / 2) - 40;
    activeBar.style.left = `${leftPos}px`;
}

// Initial state
window.addEventListener('load', () => updateHero(navItems[0]));

navItems.forEach(item => {
    item.addEventListener('mouseenter', () => updateHero(item));
});
