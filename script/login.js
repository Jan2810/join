document.addEventListener('DOMContentLoaded', () => {
    const logoBackgroundContainer = document.getElementById('login-start-animation-bg');

    const addDNoneClass = (event) => {
        if (event.animationName === 'colorFade') {
            logoBackgroundContainer.classList.add('d-none');
            logoBackgroundContainer.style.zIndex = '-1';
        }
    };
});

async function login() {
    users = await loadData(USERS_URL);
    console.log(users);
    let email = document.getElementById("login-input-email");
    let password = document.getElementById("login-input-password");
    activeUser = users.find(user => user.email === email.value);
    
    console.log(activeUser);
    if (!activeUser) {
        userError();
    } else if (activeUser.password === password.value) {
        activeUser = users.find(u => u.email === email.value && u.password === password.value);
        delete activeUser.password;
        saveUser(activeUser);
        window.location.href = "./html/summary.html";
    } else {
        passwordError();
    }
};

function toggleVisibility() {
    const passwordField = document.getElementById('login-input-password');
    const toggleImg = document.getElementById('login-visibility-toggle-img');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleImg.src = './assets/icons/visibility.svg';
    } else {
        passwordField.type = 'password';
        toggleImg.src = './assets/icons/visibility_off.svg';
    }
};

function userError() {
    document.getElementById('login-input-user-error').classList.remove('d-none');
    document.getElementById('login-input-email').classList.add('login-error-border')
};

function removeUserError() {
    document.getElementById('login-input-user-error').classList.add('d-none');
    document.getElementById('login-input-email').classList.remove('login-error-border')
};

function passwordError() {
    document.getElementById('login-input-password-error').classList.remove('d-none');
    document.getElementById('login-input-password').classList.add('login-error-border')
};

function removePasswordError() {
    document.getElementById('login-input-password-error').classList.add('d-none');
    document.getElementById('login-input-password').classList.remove('login-error-border')
};
