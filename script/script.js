async function loadData(path = "") {
    let response = await fetch(SERS_URL + path + ".json");
    return responseToJson = await response.json();
}
let users;

const USERS_URL = "https://join-14fdc-default-rtdb.europe-west1.firebasedatabase.app/";

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

