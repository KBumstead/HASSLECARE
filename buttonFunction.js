document.getElementById('logo-header').setAttribute("href", "/")

document.getElementById('login-header').addEventListener('click', function() {
    // Navigate to another HTML page
    window.location.href = 'login.html';
});

document.getElementById('register-header').addEventListener('click', function() {
    // Navigate to another HTML page
    window.location.href = 'register.html';
});