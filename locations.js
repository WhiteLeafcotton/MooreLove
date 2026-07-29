document.addEventListener('DOMContentLoaded', () => {
    // Force reveal location elements if IntersectionObserver is waiting for scroll
    const locCards = document.querySelectorAll('.loc-card');
    locCards.forEach(card => card.classList.add('is-visible', 'active'));

    // Handle Region Tab switching (01 / NORTH AMERICA, etc.)
    const regionTabs = document.querySelectorAll('.region-tab'); // adjust selector to match your HTML
    regionTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            regionTabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Add tab filtering or card display logic here
        });
    });
});
