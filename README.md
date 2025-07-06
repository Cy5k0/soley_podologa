# Soley Pérez Hernández - Podología Profesional

This repository contains the source code for the professional podiatry website of Soley Pérez Hernández.

## Project Structure

```
soley/
├── assets/
│   ├── css/
│   │   └── custom.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   └── icons/
├── index.html
├── sitemap.xml
├── robots.txt
├── README.md
└── .gitignore
```

## Getting Started

To set up the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/soley.git
    cd soley
    ```

2.  **Open `index.html`:** Simply open the `index.html` file in your web browser to view the website.

## Bootstrap Setup and Customization

This project uses Bootstrap 5 for its responsive design and UI components.

### CDN Fallback

Bootstrap CSS and JS are loaded via CDN. In case the CDN is unavailable, you can add a local fallback:

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
<script>window.bootstrap || document.write('<link rel="stylesheet" href="path/to/local/bootstrap.min.css">')</script>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
<script>window.bootstrap || document.write('<script src="path/to/local/bootstrap.bundle.min.js"><\/script>')</script>
```

### Customization Guide

Custom Bootstrap styles are located in `assets/css/custom.css`. You can override Bootstrap's default variables and add custom CSS rules here.

## Deployment with GitHub Pages

This project is configured for deployment with GitHub Pages.

1.  **Create a GitHub Repository:** Push your project to a new GitHub repository.
2.  **Enable GitHub Pages:** Go to your repository settings on GitHub, navigate to the "Pages" section, and select the `main` branch (or `gh-pages` if you prefer) as the source.
3.  **Custom Domain (Optional):** If you have a custom domain, you can configure it in the GitHub Pages settings.

## Performance Budgets

To ensure optimal performance, consider the following budgets:

*   **Page Load Time:** Aim for under 2 seconds on a 3G connection.
*   **Total Page Size:** Keep it under 500KB (compressed).
*   **Number of Requests:** Minimize HTTP requests.

## AWS Integration

This section outlines the necessary steps to configure the AWS backend services for the Soley Podología website.

### 1. AWS Cognito (Optional)

If you want to add user authentication to the website, you can use AWS Cognito.

1.  **Create a User Pool:** Go to the AWS Cognito console and create a new user pool.
2.  **Configure App Client:** Create an app client and make sure to uncheck "Generate client secret".
3.  **Get Pool ID and Client ID:** Once the user pool is created, you will get a "Pool Id" and an "App client id".
4.  **Update `main.js`:** Update the `awsConfig` object in `assets/js/main.js` with your Cognito User Pool ID and App Client ID.

### 2. AWS SES (Simple Email Service)

To send emails from the contact form, you need to configure AWS SES.

1.  **Verify Email Addresses:** In the SES console, verify the "From" and "To" email addresses.
2.  **Create IAM User:** Create an IAM user with programmatic access and attach the `AmazonSESFullAccess` policy.
3.  **Get Access Keys:** Get the Access Key ID and Secret Access Key for the IAM user.
4.  **Update `main.js`:** Update the `awsConfig` object in `assets/js/main.js` with your SES region, from address, and to address.
5.  **Backend Implementation:** You will need a backend service (e.g., an AWS Lambda function) to handle the actual email sending. The frontend will send the form data to this service, which will then use the AWS SDK to send the email through SES.

### 3. reCAPTCHA v3

To protect your contact form from spam, you need to configure reCAPTCHA v3.

1.  **Get a Site Key:** Go to the reCAPTCHA website and register your site to get a site key.
2.  **Update `index.html`:** In `index.html`, replace `YOUR_RECAPTCHA_SITE_KEY` in the script tag with your actual site key.
3.  **Update `main.js`:** Update the `awsConfig` object in `assets/js/main.js` with your reCAPTCHA site key.

## Maintenance Documentation

*   **Regular Updates:** Keep Bootstrap and other libraries updated to their latest versions to benefit from bug fixes and new features.
*   **Content Updates:** Regularly review and update the website content, especially service descriptions, contact information, and business hours.
*   **SEO Monitoring:** Monitor your website's SEO performance using tools like Google Search Console and adjust your strategy as needed.
*   **Backup:** Regularly back up your website files.