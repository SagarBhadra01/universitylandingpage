document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Create payload
      const payload = {
        name,
        email,
        phone,
        subject,
        message,
      };

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Send data to backend
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // Show success message
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;

          // Clear form
          contactForm.reset();

          // Show success message
          const formContainer = document.querySelector(
            ".contact-form-container"
          );
          const successMsg = document.createElement("div");
          successMsg.className = "success-message";
          successMsg.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <p>${data.message}</p>
        `;

          formContainer.appendChild(successMsg);

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMsg.remove();
          }, 5000);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;

          // Show error message
          const formContainer = document.querySelector(
            ".contact-form-container"
          );
          const errorMsg = document.createElement("div");
          errorMsg.className = "error-message";
          errorMsg.innerHTML = `
          <i class="fas fa-exclamation-circle"></i>
          <p>Sorry, there was an error submitting your message. Please try again later.</p>
        `;

          formContainer.appendChild(errorMsg);

          // Remove error message after 5 seconds
          setTimeout(() => {
            errorMsg.remove();
          }, 5000);
        });
    });
  }
});
