document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Logic
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

    // 2. Hero Content & Image Swapping Logic
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
            if (heroVideo) {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            moveLine(item);
        };
        item.addEventListener('mouseenter', updateHero);
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            updateHero();
        }, { passive: false });
    });

    setTimeout(() => { if (iconItems.length > 0) moveLine(iconItems[0]); }, 100);

    // 3. Slide-Up Masked Reveal Animation for Featured Card
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.h3-mask h3');
                if (title) title.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) observer.observe(featuredCard);

    // 4. TV Television Style 14-Tile Reveal (2 Rows of 7)
    function initTVReveal() {
        const grid = document.getElementById('mosaicGrid');
        if (!grid) return;

        const flashImages = ['senior1.jpg', 'senior2.jpg', 'senior3.jpg', 'senior4.jpg']; 
        // Ensure these arrays have 14 entries each to fill the 14 tiles
        const finalSet1 = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg'];
        const finalSet2 = ['15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg'];
        const finalSets = [finalSet1, finalSet2];

        for (let i = 0; i < 14; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            grid.appendChild(tile);
        }
        const tiles = document.querySelectorAll('.tile');
        let cycleIndex = 0;

        function runCycle() {
            if (cycleIndex >= 2) return;

            const flashInterval = setInterval(() => {
                tiles.forEach(tile => {
                    tile.style.backgroundImage = `url('${flashImages[Math.floor(Math.random() * flashImages.length)]}')`;
                });
            }, 100);

            setTimeout(() => {
                clearInterval(flashInterval);
                tiles.forEach((tile, i) => {
                    tile.style.backgroundImage = `url('${finalSets[cycleIndex][i]}')`;
                });

                cycleIndex++;
                if (cycleIndex < 2) {
                    setTimeout(runCycle, 3000);
                }
            }, 5000);
        }
        runCycle();
    }

    const mosaicObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initTVReveal();
            mosaicObserver.disconnect();
        }
    }, { threshold: 0.2 });

    const section = document.getElementById('mosaicSection');
    if (section) mosaicObserver.observe(section);
});
