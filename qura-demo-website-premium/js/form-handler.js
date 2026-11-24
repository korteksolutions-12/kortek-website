// Contact form submission handler - standalone, no dependencies
(function(){'use strict';

const FORM_API_URL = '/api/contact'; // Change this to your actual endpoint

async function submitContactForm(formData) {
  try {
    const response = await fetch(FORM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        // Honeypot field (bot trap) - should be empty for humans
        website: formData.website || ''
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

function setupContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) {
    console.warn('Form not found:', formId);
    return;
  }

  // Add honeypot field (hidden from users, bots may fill it)
  if (!form.querySelector('.honeypot')) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.className = 'honeypot';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-5000px';
    honeypot.autocomplete = 'off';
    form.appendChild(honeypot);
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Check honeypot - if filled, it's likely a bot
      if (data.website && data.website.trim() !== '') {
        // Silently fail for bots
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1000);
        return;
      }
      
      await submitContactForm(data);
      
      // Success feedback
      form.innerHTML = `
        <div class="form-success">
          <h3>Thank you!</h3>
          <p>Your message has been sent. We'll get back to you shortly.</p>
        </div>
      `;
    } catch (error) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show user-friendly error
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.style.color = '#ef4444';
      errorDiv.style.padding = '1rem';
      errorDiv.style.marginTop = '1rem';
      errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again.';
      form.appendChild(errorDiv);
      
      setTimeout(() => {
        if (errorDiv.parentNode) {
          errorDiv.parentNode.removeChild(errorDiv);
        }
      }, 5000);
    }
  });
}

// Initialize form handlers when DOM is ready
function initForms() {
  const contactForms = document.querySelectorAll('#contactForm, .contact-form');
  contactForms.forEach(form => {
    setupContactForm(form.id);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}

window.setupContactForm = setupContactForm;
window.submitContactForm = submitContactForm;

})();