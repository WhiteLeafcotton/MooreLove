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
    const iconItems = document.querySelectorAll('.icon-item');
    const heroVideo = document.getElementById('heroVideo');
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.getElementById('heroTitle') || document.querySelector('.hero-content h1');
    const heroBtn = document.getElementById('heroButton') || document.querySelector('.hero-button') || document.querySelector('.card-btn');
    const activeLine = document.getElementById("activeLine");

    // Cross-fade dual layers
    const bgA = document.getElementById('heroBgA');
    const bgB = document.getElementById('heroBgB');
    let currentBg = 'A'; // Tracks active layer

    function updateHeroContent(item) {
        // 1. Hide initial logo block smoothly
        if (heroLogo) {
            heroLogo.classList.add('hidden');
        }

        // 2. Hide video smoothly on tab interaction
        if (heroVideo && heroVideo.style.display !== 'none') {
            heroVideo.style.transition = 'opacity 1s ease';
            heroVideo.style.opacity = '0';
            setTimeout(() => {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }, 1000);
        }

        // 3. Heavy/Slow Cross-Fade Image Transition
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

        // 4. Headline Text Swap
        if (heroTitle && item.dataset.title && heroTitle.innerHTML !== item.dataset.title) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(8px)';
            setTimeout(() => {
                heroTitle.innerHTML = item.dataset.title;
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 400);
        }

        // 5. Update CTA Button Text & Dynamic Routing
        if (heroBtn && item.dataset.cta) {
            heroBtn.innerText = item.dataset.cta;
        }

        const targetUrl = item.getAttribute('data-href');
        if (heroBtn) {
            if (targetUrl) {
                heroBtn.onclick = () => { window.location.href = targetUrl; };
            } else if (item.dataset.cta === "Explore Community") {
                heroBtn.onclick = () => { window.location.href = "locations.html"; };
            } else {
                heroBtn.onclick = null;
            }
        }

        // 6. Active Tab Styling & Line Sliding
        iconItems.forEach(icon => icon.classList.remove('active'));
        item.classList.add('active');

        if (activeLine) {
            activeLine.style.width = item.offsetWidth + "px";
            activeLine.style.left = item.offsetLeft + "px";
        }
    }

    // Tab Listeners (Hover & Click support)
   // Tab Listeners (Hover & Click support)
    iconItems.forEach((item) => {
        item.addEventListener('mouseenter', () => updateHeroContent(item));
        
        item.addEventListener('click', (e) => {
            // If it's an <a> tag, let it navigate naturally to its href
            // Update the hero content visually first, then let the browser route
            updateHeroContent(item);
        });
    });

    // Initialize active line positioning
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
   // ==========================================
// 5. Update CTA Button
// ==========================================
if (heroBtn && item.dataset.cta) {
    heroBtn.textContent = item.dataset.cta;
}

const targetUrl = item.dataset.href;

if (heroBtn) {
    if (targetUrl) {
        // If heroBtn is an <a>, update its href.
        heroBtn.setAttribute("href", targetUrl);
    } else {
        heroBtn.setAttribute("href", "#");
    }
}

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
