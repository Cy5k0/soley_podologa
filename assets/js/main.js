document.addEventListener('DOMContentLoaded', function () {

    // AWS Configuration (replace with your actual values)
    const awsConfig = {
        cognito: {
            userPoolId: 'YOUR_COGNITO_USER_POOL_ID',
            userPoolWebClientId: 'YOUR_COGNITO_APP_CLIENT_ID',
            region: 'YOUR_AWS_REGION'
        },
        ses: {
            fromAddress: 'YOUR_SES_FROM_ADDRESS',
            toAddress: 'YOUR_SES_TO_ADDRESS',
            region: 'YOUR_AWS_REGION'
        },
        recaptcha: {
            siteKey: 'YOUR_RECAPTCHA_SITE_KEY'
        }
    };

    // Initialize Bootstrap components
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            grecaptcha.ready(function () {
                grecaptcha.execute(awsConfig.recaptcha.siteKey, { action: 'submit' }).then(function (token) {
                    const formData = new FormData(contactForm);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        service: formData.get('service'),
                        message: formData.get('message'),
                        token: token
                    };
                    sendEmailWithSES(data);
                });
            });
        });
    }

    function sendEmailWithSES(data) {
        const submitButton = document.getElementById('submitButton');
        const spinner = submitButton.querySelector('.spinner-border');
        const formAlerts = document.getElementById('form-alerts');

        spinner.classList.remove('d-none');
        submitButton.disabled = true;

        // This is a placeholder for the actual AWS SES API call.
        // You would typically use the AWS SDK for JavaScript here.
        console.log('Sending data to AWS SES:', data);

        // Simulate API call
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                formAlerts.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Mensaje enviado!</strong> Nos pondremos en contacto contigo a la brevedad.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            } else {
                formAlerts.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>¡Error!</strong> No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            spinner.classList.add('d-none');
            submitButton.disabled = false;
        }, 2000);
    }
});
