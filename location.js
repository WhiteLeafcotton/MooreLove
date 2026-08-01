document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide icons if not already done
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.location-section');
    const wrapper = document.querySelector('.locations-wrapper');

    // Function to scroll to a specific section index
    function scrollToSection(index) {
        const targetSection = sections[index];
        if (!targetSection) return;

        // Smooth scroll container to section
        wrapper.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
        });
    }

    // Tab click event listeners
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Update active state classes on tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update indicator position
            const indicator = document.getElementById('notchIndicator');
            if (indicator) {
                indicator.style.width = `${tab.offsetWidth}px`;
                indicator.style.left = `${tab.offsetLeft}px`;
            }

            // Scroll to corresponding section
            scrollToSection(index);
        });
    });

    // Optional: Update active tab on horizontal scroll intersection / position
    let scrollTimeout;
    wrapper.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = wrapper.scrollLeft;
            const width = wrapper.clientWidth;
            const currentIndex = Math.round(scrollLeft / width);

            if (tabs[currentIndex] && !tabs[currentIndex].classList.contains('active')) {
                tabs.forEach(t => t.classList.remove('active'));
                tabs[currentIndex].classList.add('active');

                const indicator = document.getElementById('notchIndicator');
                if (indicator) {
                    indicator.style.width = `${tabs[currentIndex].offsetWidth}px`;
                    indicator.style.left = `${tabs[currentIndex].offsetLeft}px`;
                }
            }
        }, 50);
    });

    // GSAP Reveal Animation for Plop Items inside sections
    gsap.utils.toArray('.location-section').forEach((section) => {
        const items = section.querySelectorAll('.plop-item');
        
        gsap.from(items, {
            scrollTrigger: {
                trigger: section,
                containerAnimation: window.innerWidth > 768 ? null : undefined,
                start: "left center",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    });
});
