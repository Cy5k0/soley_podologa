document.addEventListener("DOMContentLoaded", function() {
    // Cargar Navbar
    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            // Activar el enlace de la página actual
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
                
                // Hide offcanvas menu on click (for mobile experience)
                link.addEventListener('click', () => {
                    const offcanvasEl = document.getElementById('offcanvasNavbar');
                    if (offcanvasEl) {
                        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                        if (bsOffcanvas) {
                            bsOffcanvas.hide();
                        }
                    }
                });
            });
        });

    // Cargar Footer
    fetch('assets/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});