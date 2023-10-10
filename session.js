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