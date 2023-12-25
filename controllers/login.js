function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

function redirectToSignUp() {
    window.location.href = '/signup'; // Adjust the URL according to your application's routing
}

function validateLogin() {
    // Add your login validation logic here
    // For example, you can check if the email and password are filled before submission
}
