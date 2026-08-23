document.addEventListener('DOMContentLoaded', function () {
    // Animations on Scroll using Intersection Observer
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        elementObserver.observe(el);
    });

    // Affiliate Link Click Tracking (Basic)
    const affiliateLinks = document.querySelectorAll('.affiliate-btn');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const productTitle = this.closest('.product-card').querySelector('.card-title').textContent.trim();
            const destination = this.getAttribute('href');

            console.log(`Affiliate link clicked! Product: "${productTitle}", Destination: "${destination}"`);

            // In a real application, you would send this data to an analytics service.
            // For example: gtag('event', 'affiliate_click', { 'product': productTitle });
        });
    });
});
