let users = [
    {
        email: "felix.kirmsegmail.com",
        password: "123"
    },
    {
        email: "felix.kirmsegmail.com",
        password: "123"
    }
];

function addUser() {
    let email = document.getElementById("signup-input-email");
    let password = document.getElementById("signup-input-password");
    users.push({ email: email.value, password: password.value })
    //weiterleitung zu login seite
    window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}