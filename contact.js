// contact.js
(() => {
  /* 1 — initialise */

  emailjs.init('PUBLIC_KEY_HERE');     // paste your public key

  /* 2 — elements */

  const form   = document.getElementById('contactForm');
  const status = document.getElementById('form-status');

  /* 3 — submit handler */

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Sending… ⏳';

    emailjs
      .sendForm('SERVICE_ID_HERE', 'TEMPLATE_ID_HERE', form)
      .then(() => {
        status.textContent = '✅ Thank you! We’ll reply shortly.';
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        status.textContent =
          '❌ Sorry, something went wrong. Please try again later.';
      });
  });
})();
