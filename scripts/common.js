async function fetchWithSession(url, request) {
    return await fetch(url, {
        ...request,
        headers: {
            ...request.headers,
            Session: getCookie("sessionToken")
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

// Function to toggle navbar buttons based on the presence of a session cookie
function toggleButtons() {
    const loginButton = document.getElementById('login-header');
    const registerButton = document.getElementById('register-header');
    const businessButton = document.getElementById('business-header');
    const accountButton = document.getElementById('account-header');

    if (getCookie("sessionToken")) {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        businessButton.style.display = '';
        accountButton.style.display = '';
    } else {
        loginButton.style.display = '';
        registerButton.style.display = '';
        businessButton.style.display = 'none';
        accountButton.style.display = 'none';
    }
}

toggleButtons()

// Add event listener for search input in navbar
document.getElementById("search-input").addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        window.location.href = `/services/search?q=${document.getElementById("search-input").value}`;
    }
})

function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const base64String = reader.result; // Extract base64 string
                resolve(base64String);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(file);
        }
        else {
            resolve(null)
        }
    });
}

function getOrderDateFormat(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}

function getMonthName(monthId) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthId]
}

function getOrderStatusClass(orderStatus) {
    switch (orderStatus) {
        case "pending":
            return "text-bg-warning"
        case "upcoming":
            return "text-bg-info"
        case "ongoing":
            return "text-bg-primary"
        case "finished":
            return "text-bg-success"
        case "canceled":
            return "text-bg-danger"
        default:
            return "text-bg-secondary"
    }
}

function getOrderStatusTextClass(orderStatus) {
    switch (orderStatus) {
        case "pending":
            return "text-warning"
        case "upcoming":
            return "text-info"
        case "ongoing":
            return "text-primary"
        case "finished":
            return "text-success"
        case "canceled":
            return "text-danger"
        default:
            return "text-secondary"
    }
}