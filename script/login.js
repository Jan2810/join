

async function login() {
    console.log("test");
    users = await loadData();
    let email = document.getElementById("login-input-email");
    let password = document.getElementById("login-input-password");
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if (user) {
        alert("user gefunden! Wenn alles fertig ist wirst du zum board weitergeleitet :)");
    }
    else {
        alert("USer nicht gefunden");
    }

}