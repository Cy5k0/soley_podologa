// Configuración de AWS
const REGION = "us-east-1";
const IDENTITY_POOL_ID = "us-east-1:91e4b481-813e-4793-95f9-bc4f1814b716";
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:183295419448:ContactForm-Podologa-Soley";

// Configurar AWS SDK
AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
});

// Crear el cliente SNS
const sns = new AWS.SNS();

// Función para enviar el mensaje a SNS
function sendMessageToSNS(name, email, phone, service, message) {
    const params = {
        Message: `Nuevo mensaje de contacto desde la web:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nServicio de interés: ${service}\n\nMensaje:\n${message}`,
        TopicArn: SNS_TOPIC_ARN
    };

    return new Promise((resolve, reject) => {
        sns.publish(params, function(err, data) {
            if (err) {
                console.error("Error al enviar el mensaje a SNS:", err);
                reject(err);
            } else {
                console.log("Mensaje enviado con éxito a SNS:", data.MessageId);
                resolve(data);
            }
        });
    });
}

// Función para mostrar mensajes en el contenedor de alertas del formulario
function showMessage(text, type) {
    const alertContainer = document.getElementById('form-alerts');
    if (!alertContainer) return;

    alertContainer.innerHTML = ''; // Limpiar alertas anteriores
    const alertMsg = document.createElement('div');
    alertMsg.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show mt-3`;
    alertMsg.setAttribute('role', 'alert');
    alertMsg.innerHTML = `<strong>${text}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    alertContainer.appendChild(alertMsg);
}

// Implementar un límite de envíos para prevenir spam
const RATE_LIMIT = 3; // Número máximo de envíos permitidos
const TIME_WINDOW = 3600000; // Ventana de tiempo en milisegundos (1 hora)

function checkRateLimit() {
    const now = Date.now();
    let rateData;
    try {
        rateData = JSON.parse(localStorage.getItem('rateLimitData')) || { count: 0, timestamp: now };
    } catch (e) {
        rateData = { count: 0, timestamp: now };
    }

    if (now - rateData.timestamp > TIME_WINDOW) {
        // Si ha pasado más de una hora, reiniciar el contador
        rateData = { count: 0, timestamp: now };
    }

    if (rateData.count >= RATE_LIMIT) {
        showMessage("Has excedido el límite de envíos. Por favor, inténtalo más tarde.", "error");
        return false;
    }

    rateData.count++;
    localStorage.setItem('rateLimitData', JSON.stringify(rateData));
    return true;
}

// Manejar el envío del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) {
        // Si el formulario no existe en la página actual, no hacer nada.
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Activar la validación de Bootstrap
        form.classList.add('was-validated');

        // Comprobar la validez del formulario (incluyendo campos requeridos y patrones)
        if (!form.checkValidity()) {
            // Bootstrap se encargará de mostrar los mensajes de error de los campos
            return;
        }

        // Obtener los valores de los campos del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const honeypot = document.getElementById('website_url')?.value;

        // Validar el honeypot (Anti-spam): si está lleno, es casi seguro un bot
        if (honeypot) {
            console.warn("Posible bot detectado mediante honeypot. Envío abortado silenciosamente.");
            // Simulamos éxito para confundir al bot
            showMessage("Tu mensaje ha sido enviado con éxito. ¡Gracias!", "success");
            form.reset();
            form.classList.remove('was-validated');
            return;
        }

        // Validar contenido del mensaje (Anti-spam): bloquear si contiene múltiples enlaces
        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
        const urls = message.match(urlRegex) || [];
        if (urls.length > 1) {
            console.warn("Posible spam detectado: múltiples enlaces en el mensaje.");
            showMessage("Tu mensaje ha sido enviado con éxito. ¡Gracias!", "success");
            form.reset();
            form.classList.remove('was-validated');
            return;
        }

        // Comprobar el límite de envíos reales
        if (!checkRateLimit()) {
            return;
        }

        const submitButton = document.getElementById('submitButton');
        const spinner = submitButton.querySelector('.spinner-border');
        
        // Deshabilitar el botón y mostrar el spinner
        submitButton.disabled = true;
        if(spinner) spinner.classList.remove('d-none');
        
        // Cambiar el texto del botón. Se asume que el texto es el último nodo hijo.
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...`;

        try {
            // Enviar los datos al servicio de backend (AWS SNS)
            await sendMessageToSNS(name, email, phone, service, message);
            showMessage("Tu mensaje ha sido enviado con éxito. ¡Gracias!", "success");
            
            // Limpiar formulario y estados de validación
            form.reset();
            form.classList.remove('was-validated');
            
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            showMessage("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.", "error");
        } finally {
            // Rehabilitar el botón y restaurar el texto original con un pequeño retraso para mejor UX
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Si el spinner estaba oculto por d-none, asegurar que se mantenga así
                const newSpinner = submitButton.querySelector('.spinner-border');
                if(newSpinner) newSpinner.classList.add('d-none');
            }, 500);
        }
    });
});
