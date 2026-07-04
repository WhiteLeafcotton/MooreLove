const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');

items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Change background
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
        // Move sliding bar
        const rect = item.getBoundingClientRect();
        bar.style.left = `${rect.left + (rect.width/2) - 25}px`;
    });
});
