document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navigation Logic
    // ==========================================
    const hero = document.getElementById("hero");
    const nav = document.getElementById("mainNav");

    function updateNav() {
        if (!hero || !nav) return;
        if (window.scrollY >= hero.offsetHeight) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    }
    window.addEventListener("scroll", updateNav, { passive: true });

    // ==========================================
    // 2. Hero Content & Image Swapping Logic
    // ==========================================
    const iconItems = document.querySelectorAll('.icon-item');
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroBtn = document.querySelector('.hero-button');
    const activeLine = document.getElementById("activeLine");

    function updateHeroContent(item) {
        if (heroVideo) {
            heroVideo.style.display = 'none';
            heroVideo.pause();
        }
        
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
        if (heroTitle) heroTitle.innerHTML = item.dataset.title;
        if (heroBtn) heroBtn.innerText = item.dataset.cta;
        
        if (activeLine) {
            activeLine.style.width = item.offsetWidth + "px";
            activeLine.style.left = item.offsetLeft + "px";
        }
    }

    iconItems.forEach((item) => {
        item.addEventListener('mouseenter', () => updateHeroContent(item));
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateHeroContent(item);
        });
    });

    setTimeout(() => { 
        if (activeLine && iconItems.length > 0) {
            activeLine.style.width = iconItems[0].offsetWidth + "px";
            activeLine.style.left = iconItems[0].offsetLeft + "px";
        }
    }, 100);

    // ==========================================
    // 3. Featured Card Intersection Observer
    // ==========================================
    const featuredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('h3');
                if (title) title.classList.add('is-visible');
                featuredObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) featuredObserver.observe(featuredCard);

    // ==========================================
    // 4. Mosaic Grid Reveal Animation
    // ==========================================
    const mosaicGrid = document.getElementById('mosaicGrid');
    const mosaicObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const cards = mosaicGrid.querySelectorAll('.tile-card');
            cards.forEach((card, index) => {
                setTimeout(() => card.classList.add('is-active'), index * 150);
            });
            mosaicObserver.disconnect();
        }
    }, { threshold: 0.2 });

    const mosaicSection = document.getElementById('mosaicSection');
    if (mosaicSection && mosaicGrid) mosaicObserver.observe(mosaicSection);

    // ==========================================
    // 5. Locations Gallery & Swipe Logic
    // ==========================================
    const gallery = document.getElementById('locationsGallery');
    const locCards = document.querySelectorAll('.loc-card');

    function setActiveCard(card) {
        locCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const bg = card.getAttribute('data-bg');
        if (gallery && bg) {
            gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}') center/cover no-repeat`;
        }
    }

    const initialActive = document.querySelector('.loc-card.active');
    if (initialActive) setActiveCard(initialActive);

    locCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                e.preventDefault(); 
                setActiveCard(card);

                if (window.innerWidth <= 768) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        });
    });

    let touchStartX = 0;
    
    gallery?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery?.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            const activeIndex = Array.from(locCards).findIndex(c => c.classList.contains('active'));
            
            if (diff > 0 && activeIndex < locCards.length - 1) {
                setActiveCard(locCards[activeIndex + 1]);
                locCards[activeIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } 
            else if (diff < 0 && activeIndex > 0) {
                setActiveCard(locCards[activeIndex - 1]);
                locCards[activeIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, { passive: true });

    // ==========================================
    // 6. Text Reveal Section Animation
    // ==========================================
    const revealTarget = document.querySelector(".message-block");

    if (revealTarget) {
        const textObserverOptions = {
            root: null,
            rootMargin: "0px 0px -15% 0px",
            threshold: 0.15
        };

        const textObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        }, textObserverOptions);

        textObserver.observe(revealTarget);
    }

});
