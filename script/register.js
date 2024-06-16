

function register(event) {
    event.preventDefault();
    showOverlay();
    addUser();
}

function addUser() {
    let email = document.getElementById("signup-input-email");
    let password = document.getElementById("signup-input-password");
    users.push({ email: email.value, password: password.value })
    //weiterleitung zu login seite
    window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}

function showOverlay() {
    document.getElementById('register-success-overlay').style.display = 'block';
    let successMessage = document.getElementById('register-success-message');
    successMessage.classList.add('show');

    setTimeout(function() {
        successMessage.classList.remove('show');
        document.getElementById('register-success-overlay').style.display = 'none';
    }, 1000);
}