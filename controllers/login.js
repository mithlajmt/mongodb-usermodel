function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

function redirectToSignUp() {
    window.location.href = '/signup'; // Adjust the URL according to your application's routing
}

