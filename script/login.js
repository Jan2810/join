

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


