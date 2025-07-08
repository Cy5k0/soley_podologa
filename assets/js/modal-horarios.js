document.addEventListener('DOMContentLoaded', function () {

    // 1. Verificación de Carga de Bootstrap
    if (typeof bootstrap === 'undefined') {
        console.error('Error: Bootstrap 5 no está cargado. El modal de horarios no funcionará.');
        return;
    }

    const horariosModalElement = document.getElementById('horariosModal');

    // Si el modal no existe en la página, no continuamos
    if (!horariosModalElement) {
        return;
    }

    // 2. Inicialización del Modal de Bootstrap 5
    const horariosModal = new bootstrap.Modal(horariosModalElement, {
        keyboard: true, // Permite cerrar con la tecla ESC
        backdrop: 'static' // Evita que se cierre al hacer clic fuera, para un control más explícito
    });

    // 3. Event Listeners para Abrir/Cerrar
    const openModalLinks = document.querySelectorAll('a[href="#horarios"]');

    openModalLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            horariosModal.show();
        });
    });

    // 4. Manejo de Foco para Accesibilidad
    horariosModalElement.addEventListener('shown.bs.modal', function () {
        // Transferir el foco al modal para que sea el elemento activo
        const closeButton = horariosModalElement.querySelector('.btn-close');
        if (closeButton) {
            closeButton.focus();
        }
    });

    // 5. Prevención de Scroll del Body
    horariosModalElement.addEventListener('show.bs.modal', function () {
        document.body.style.overflow = 'hidden';
    });

    horariosModalElement.addEventListener('hidden.bs.modal', function () {
        document.body.style.overflow = 'auto';
    });

    // 6. Animaciones (manejadas por las clases de Bootstrap .fade)
    // Las animaciones de entrada/salida se controlan con CSS a través de las clases que Bootstrap añade.

    console.log('Modal de horarios inicializado correctamente.');
});
