

async function login() {

    users = await loadData(USERS_URL);
    console.log(users);

    let email = document.getElementById("login-input-email");
    let password = document.getElementById("login-input-password");
    user = users.find(u => u.email === email.value && u.password === password.value);
    console.log(user);
    if (user) {
        saveUser(user);
        console.log("done");
        window.location.href = "./html/summary.html";
    }
    else {
        alert("User nicht gefunden");
    }
}


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
}