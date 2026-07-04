const activeBar = document.getElementById('activeBar');
const navItems = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');

// Set initial position
activeBar.style.left = `${navItems[0].offsetLeft + (navItems[0].offsetWidth/2) - 30}px`;

navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Move bar
        const leftPos = item.offsetLeft + (item.offsetWidth/2) - 30;
        activeBar.style.left = `${leftPos}px`;
        
        // Update background
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${item.getAttribute('data-img')}')`;
    });
});
