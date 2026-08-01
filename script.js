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
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    const iconItems = document.querySelectorAll('.icon-item');
    const heroVideo = document.getElementById('heroVideo');
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.getElementById('heroTitle') || document.querySelector('.hero-content h1');
    const heroBtn = document.getElementById('heroButton') || document.querySelector('.hero-button') || document.querySelector('.card-btn');
    const activeLine = document.getElementById("activeLine");

    // Cross-fade dual layers
    const bgA = document.getElementById('heroBgA');
    const bgB = document.getElementById('heroBgB');
    let currentBg = 'A';

    let currentTargetUrl = iconItems[0]?.getAttribute('data-href') || '#';

    function updateHeroContent(item) {
        if (heroLogo) {
            heroLogo.classList.add('hidden');
        }

        if (heroVideo && heroVideo.style.display !== 'none') {
            heroVideo.style.transition = 'opacity 1s ease';
            heroVideo.style.opacity = '0';
            setTimeout(() => {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }, 1000);
        }

        const newImage = item.dataset.image;
        if (newImage) {
            const bgUrl = `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('${newImage}')`;

            if (currentBg === 'A') {
                if (bgB) {
                    bgB.style.backgroundImage = bgUrl;
                    bgB.classList.add('active');
                }
                if (bgA) bgA.classList.remove('active');
                currentBg = 'B';
            } else {
                if (bgA) {
                    bgA.style.backgroundImage = bgUrl;
                    bgA.classList.add('active');
                }
                if (bgB) bgB.classList.remove('active');
                currentBg = 'A';
            }
        }

        if (heroTitle && item.dataset.title && heroTitle.innerHTML !== item.dataset.title) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(8px)';
            setTimeout(() => {
                heroTitle.innerHTML = item.dataset.title;
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 400);
        }

        if (heroBtn && item.dataset.cta) {
            heroBtn.innerText = item.dataset.cta;
        }

        currentTargetUrl = item.getAttribute('data-href') || '#';

        iconItems.forEach(icon => icon.classList.remove('active'));
        item.classList.add('active');

        if (activeLine) {
            activeLine.style.width = item.offsetWidth + "px";
            activeLine.style.left = item.offsetLeft + "px";
        }
    }

    // Main Hero CTA button click redirection
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTargetUrl && currentTargetUrl !== '#') {
                window.location.href = currentTargetUrl;
            }
        });
    }

    // Tab Listeners
    iconItems.forEach((item) => {
        item.addEventListener('mouseenter', () => updateHeroContent(item));
        
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateHeroContent(item);
            const targetUrl = item.getAttribute('data-href');
            if (targetUrl && targetUrl !== '#') {
                window.location.href = targetUrl;
            }
        });
    });

    // Initialize active line positioning & first tab state
    setTimeout(() => { 
        if (activeLine && iconItems.length > 0) {
            activeLine.style.width = iconItems[0].offsetWidth + "px";
            activeLine.style.left = iconItems[0].offsetLeft + "px";
        }
    }, 100);
    // ==========================================
    // 3. Featured Card Intersection Observer
    // ==========================================
    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
        const featuredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featuredCard.classList.add('is-visible');
                    const title = entry.target.querySelector('h3');
                    if (title) title.classList.add('is-visible');
                    featuredObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        featuredObserver.observe(featuredCard);
    }

    // ==========================================
    // 4. Mosaic Grid Reveal Animation
    // ==========================================
    const mosaicGrid = document.getElementById('mosaicGrid');
    const mosaicSection = document.getElementById('mosaicSection');

    if (mosaicSection && mosaicGrid) {
        const mosaicObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const cards = mosaicGrid.querySelectorAll('.tile-card');
                cards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('is-active'), index * 150);
                });
                mosaicObserver.disconnect();
            }
        }, { threshold: 0.2 });

        mosaicObserver.observe(mosaicSection);
    }

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
