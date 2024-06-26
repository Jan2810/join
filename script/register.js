function register(event) {
    event.preventDefault();
    checkPassword();
    console.log("test");

}

function addUser() {
    let user = {};
    let email = document.getElementById("register-input-email");
    let password = document.getElementById("register-input-password");
    let name = document.getElementById("register-input-name");
    user.name = name.value;
    user.email = email.value;
    user.password = password.value;

    postData(path = "", user, USERS_URL)
    //weiterleitung zu login seite

}

function showOverlay() {
    document.getElementById('register-success-overlay').style.display = 'block';
    let successMessage = document.getElementById('register-success-message');
    successMessage.classList.add('show');

    setTimeout(function () {
        successMessage.classList.remove('show');
        document.getElementById('register-success-overlay').style.display = 'none';
    }, 1000);
    setTimeout(function () { window.location.href = "../index.html" }, 1000);
}

function checkPassword() {
    let password = document.getElementById("register-input-password");
    let passwordConfirm = document.getElementById("register-input-confirm-password");
    if (password.value == passwordConfirm.value) {
        showOverlay();
        addUser();
    }
    else {confirmPasswordError()}
}

function confirmPasswordError() {
    document.getElementById('register-input-confirm-password').classList.add('register-error-border');
    document.getElementById('register-input-password-error').classList.remove('d-none');
}

function removeConfirmPasswordError() {
    document.getElementById('register-input-confirm-password').classList.remove('register-error-border');
    document.getElementById('register-input-password-error').classList.add('d-none');
}