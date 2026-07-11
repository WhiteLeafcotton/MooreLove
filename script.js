document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navigation ---
    const hero = document.getElementById("hero");
    const nav = document.getElementById("mainNav");
    const placeholder = document.querySelector(".nav-placeholder");

    function updateNav() {
        if (!hero || !nav) return;
        if (window.scrollY >= hero.offsetHeight) {
            nav.classList.add("sticky");
            if (placeholder) placeholder.style.display = "block";
        } else {
            nav.classList.remove("sticky");
            if (placeholder) placeholder.style.display = "none";
        }
    }
    window.addEventListener("scroll", updateNav, { passive: true });

    // --- 2. Hero Image Swapping ---
    const iconItems = document.querySelectorAll('.icon-item');
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroBtn = document.querySelector('.hero-button');
    const activeLine = document.getElementById("activeLine");

    function moveLine(item) {
        if (!activeLine) return;
        activeLine.style.width = item.offsetWidth + "px";
        activeLine.style.left = item.offsetLeft + "px";
    }

    iconItems.forEach((item) => {
        const updateHero = () => {
            if (heroVideo) { heroVideo.style.display = 'none'; heroVideo.pause(); }
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            moveLine(item);
        };
        item.addEventListener('mouseenter', updateHero);
    });

    // --- 3. Mosaic Reveal (Demure 3x4 Grid) ---
    // Inside your initDemureReveal function:
function initDemureReveal() {
    const grid = document.getElementById('mosaicGrid');
    if (!grid) return;
    grid.innerHTML = ''; 

    // Exactly 9 items for the 3x3 grid
    const tileData = [
    {icon: 'fa-leaf', title: 'Nature'}, {icon: 'fa-spa', title: 'Wellness'},
    {icon: 'fa-bed', title: 'Rest'}, {icon: 'fa-wine-glass', title: 'Dining'},
    {icon: 'fa-anchor', title: 'Yachts'}, {icon: 'fa-compass', title: 'Explore'},
    {icon: 'fa-user', title: 'Service'}, {icon: 'fa-star', title: 'Quality'},
    {icon: 'fa-heart', title: 'Care'} // Exactly 9 items
];

    const shuffled = tileData.sort(() => 0.5 - Math.random());
    
    shuffled.forEach((data, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerHTML = `<i class="fa-solid ${data.icon}"></i><span>${data.title}</span>`;
        grid.appendChild(tile);

        setTimeout(() => { tile.classList.add('visible'); }, index * 100);
    });
}

    const section = document.getElementById('mosaicSection');
    const mosaicObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initDemureReveal();
            mosaicObserver.disconnect();
        }
    }, { threshold: 0.1 });

    if (section) {
        mosaicObserver.observe(section);
        // Fallback: Trigger if already in view
        if (section.getBoundingClientRect().top < window.innerHeight) {
            initDemureReveal();
        }
    }
});
