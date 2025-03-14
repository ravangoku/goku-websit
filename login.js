document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');

    registerError.textContent = ''; // Clear previous errors
    registerSuccess.textContent = '';

    if (password !== confirmPassword) {
      registerError.textContent = 'Passwords do not match.';
      return;
    }

    // *** IMPORTANT:  This is where you would make an AJAX request to your server
    // *** to send the email and password for registration.

    // Example using the `fetch` API:
    fetch('/register', {  // Replace '/register' with the actual URL of your registration endpoint on the server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json()) // Or response.text() if your server sends plain text
    .then(data => {
      if (data.success) { // Adjust based on your server's response
        registerSuccess.textContent = 'Registration successful! Please log in.';
        // Optionally, clear the form:
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('confirm-password').value = '';
      } else {
        registerError.textContent = data.message || 'Registration failed.'; // Show the error message from the server
      }
    })
    .catch(error => {
      console.error('Error:', error);
      registerError.textContent = 'An error occurred during registration.';
    });
  });

  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');

    loginError.textContent = ''; // Clear previous errors

    // *** IMPORTANT: This is where you would make an AJAX request to your server
    // *** to send the email and password for login.

    // Example using the `fetch` API:
    fetch('/login', { // Replace '/login' with the actual URL of your login endpoint on the server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json()) // Or response.text() if your server sends plain text
    .then(data => {
      if (data.success) { // Adjust based on your server's response
        // Login successful!  Redirect to a logged-in page or update the UI.
        window.location.href = '/dashboard'; // Example: Redirect to a dashboard page
      } else {
        loginError.textContent = data.message || 'Login failed.'; // Show the error message from the server
      }
    })
    .catch(error => {
      console.error('Error:', error);
      loginError.textContent = 'An error occurred during login.';
    });
  });