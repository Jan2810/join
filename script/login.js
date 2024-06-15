const USERS_URL = "https://join-14fdc-default-rtdb.europe-west1.firebasedatabase.app/";
let users;

async function loadData(path = "") {
    let response = await fetch(SERS_URL + path + ".json");
    return responseToJson = await response.json();
}




const msgBox = document.getElementById("msgBox");
const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get("msg");
if (msg) {
    msgBox.innerHTML = msg;
}
else {
    // msgBox.style = "display:none";
}

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