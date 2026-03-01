document.addEventListener('DOMContentLoaded', function () {
    
    // Initialize Bootstrap components
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.remove('d-none');
            } else {
                backToTop.classList.add('d-none');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Close mobile menu if open
            const offcanvas = document.querySelector('.offcanvas.show');
            if (offcanvas) {
                bootstrap.Offcanvas.getInstance(offcanvas).hide();
            }
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky navbar effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // Initialize service modals with more details
    const serviceModal1 = document.getElementById('serviceModal1');
    if (serviceModal1) {
        serviceModal1.querySelector('.modal-body').innerHTML = `
            <p>El tratamiento de uñas encarnadas es una de las afecciones más comunes que atendemos. La uña encarnada ocurre cuando la esquina o borde de la uña crece hacia la piel, causando dolor, inflamación y en algunos casos infección.</p>
            <h5 class="mt-3">Síntomas:</h5>
            <ul>
                <li>Dolor intenso en el borde de la uña</li>
                <li>Enrojecimiento y hinchazón</li>
                <li>Sensibilidad al tacto</li>
                <li>Supuración en casos avanzados</li>
            </ul>
            <h5 class="mt-3">Tratamiento:</h5>
            <p>Nuestro enfoque incluye el tratamiento conservador con técnicas especiales de manicura médica, separadores de uñas y cuidados postoperatorios personalizados.</p>
        `;
    }

    const serviceModal2 = document.getElementById('serviceModal2');
    if (serviceModal2) {
        serviceModal2.querySelector('.modal-body').innerHTML = `
            <p>Las durezas y callosidades son áreas de piel endurecida que se forman como respuesta a la presión o fricción constante. Aunque no son peligrosas, pueden causar dolor e incomodidad.</p>
            <h5 class="mt-3">Tratamiento:</h5>
            <ul>
                <li>Eliminación segura con instrumentos esterilizados</li>
                <li>Recomendación de productos para prevención</li>
                <li>Asesoramiento sobre calzado adecuado</li>
                <li>Aplicación de plantillas si es necesario</li>
            </ul>
            <h5 class="mt-3">Beneficios:</h5>
            <p>Reducción de dolor, mejora estética y prevención de complicaciones futuras. La eliminación profesional es más segura y efectiva que los métodos caseros.</p>
        `;
    }

    const serviceModal3 = document.getElementById('serviceModal3');
    if (serviceModal3) {
        serviceModal3.querySelector('.modal-body').innerHTML = `
            <p>El cuidado del pie diabético es crucial debido a la disminución de sensibilidad y mala circulación que experimentan muchas personas con diabetes. Sin el cuidado adecuado, pequeñas heridas pueden convertirse en complicaciones graves.</p>
            <h5 class="mt-3">Evaluación:</h5>
            <ul>
                <li>Pruebas de sensibilidad</li>
                <li>Inspección completa del pie</li>
                <li>Valoración vascular</li>
                <li>Detección de puntos de presión</li>
            </ul>
            <h5 class="mt-3">Prevención:</h5>
            <p>Nuestro enfoque incluye educación sobre cuidado diario, detección temprana de problemas y recomendaciones personalizadas para evitar complicaciones serias que podrían llevar a amputaciones.</p>
        `;
    }

    const serviceModal4 = document.getElementById('serviceModal4');
    if (serviceModal4) {
        serviceModal4.querySelector('.modal-body').innerHTML = `
            <p>Las plantillas ortopédicas personalizadas son dispositivos que se colocan dentro del calzado para mejorar la función del pie, aliviar el dolor y corregir problemas biomecánicos.</p>
            <h5 class="mt-3">¿Para quién son?</h5>
            <ul>
                <li>Personas con dolor de pie, talón o tobillo</li>
                <li>Individuos con problemas de pisada (sobrepresión o supinación)</li>
                <li>Personas con diabetes, artritis o fascitis plantar</li>
                <li>Deportistas que buscan mejorar su rendimiento</li>
            </ul>
            <h5 class="mt-3">Proceso:</h5>
            <p>Las plantillas se fabrican a partir de un molde de su pie, considerando su biomecánica específica, tipo de calzado y actividad diaria para una solución personalizada y efectiva.</p>
        `;
    }

    const serviceModal5 = document.getElementById('serviceModal5');
    if (serviceModal5) {
        serviceModal5.querySelector('.modal-body').innerHTML = `
            <p>La quiropodología es la rama de la podología que se centra en el tratamiento conservador de los problemas dermatológicos y ungueales del pie. Incluye técnicas como el corte, limado y curación de uñas y piel.</p>
            <h5 class="mt-3">Tratamientos incluidos:</h5>
            <ul>
                <li>Corte y limado de uñas gruesas</li>
                <li>Tratamiento de uñas encarnadas</li>
                <li>Eliminación de callos y durezas</li>
                <li>Tratamiento de verrugas plantares</li>
                <li>Cuidados especiales para pacientes con diabetes</li>
            </ul>
            <h5 class="mt-3">Ventajas:</h5>
            <p>La quiropodología permite tratar estos problemas de forma conservadora, evitando procedimientos quirúrgicos y manteniendo la funcionalidad del pie.</p>
        `;
    }

    const serviceModal6 = document.getElementById('serviceModal6');
    if (serviceModal6) {
        serviceModal6.querySelector('.modal-body').innerHTML = `
            <p>La podología infantil se especializa en la detección y tratamiento de problemas del pie en niños. Muchos problemas pediátricos pueden corregirse fácilmente si se detectan a tiempo.</p>
            <h5 class="mt-3">Problemas comunes:</h5>
            <ul>
                <li>Pies planos o cavos</li>
                <li>Marcha anormal (metatarsos adentro, valgo, etc.)</li>
                <li>Dedo en martillo o pies con dedos prominentes</li>
                <li>Uñas encarnadas y callos infantiles</li>
                <li>Problemas de crecimiento y dolor en pies</li>
            </ul>
            <h5 class="mt-3">Importancia del tratamiento temprano:</h5>
            <p>Abordar estos problemas pediátricos a tiempo puede prevenir problemas más graves en la edad adulta y mejorar la calidad de vida del niño.</p>
        `;
    }
    
    // Mobile menu improvements
    const mobileToggle = document.querySelector('.navbar-toggler');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                this.classList.add('collapsed');
            } else {
                this.classList.remove('collapsed');
            }
        });
    }
});
