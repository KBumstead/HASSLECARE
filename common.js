async function fetchWithSession(url, request) {
    return await fetch(url, {
        ...request,
        headers: {
            ...request.headers,
            Session: request.headers.Session || getCookie("sessionToken")
        }
    })
}

// Function to set a cookie with expiration in seconds
function setCookie(name, value, secondsToExpire = 3600) {
    const date = new Date();
    date.setTime(date.getTime() + (secondsToExpire * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
    setCookie(name, "", -1); // Set the expiration time to a past date
}

// Function to delete all cookies
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

// Function to toggle buttons based on the presence of a session cookie
function toggleButtons() {
    const loginButton = document.getElementById('login-header');
    const registerButton = document.getElementById('register-header');
    const accountButton = document.getElementById('welcome-header');
    const logoutButton = document.getElementById('account-header');

    if (getCookie("sessionToken")) {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        accountButton.style.display = 'inline';
        logoutButton.style.display = 'inline';
    } else {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        accountButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

// Call the toggleButtons function when the page loads
toggleButtons();
