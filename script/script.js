const USERS_URL = "https://join-14fdc-default-rtdb.europe-west1.firebasedatabase.app/";
const TASKS_URL = "https://join-tasks-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACTS_URL = "https://join---contacts-default-rtdb.europe-west1.firebasedatabase.app/";
let users = [];
let user = {};

async function loadData(url) {
    let response = await fetch(url + ".json");
    let data = await response.json();
    let dataArray = Object.keys(data).map(key => data[key]);
    return dataArray;
}

async function postData(path = "", data = {}, url) {
    let response = await fetch(url + path + ".json", {
        method: "POST",
        header: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response;
}


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


function saveUser() {
    const userString = JSON.stringify(user);
    console.log(userString);
    localStorage.setItem('user', userString);


}

function loadUser() {
    const retrievedUserString = localStorage.getItem('user');
    user = JSON.parse(retrievedUserString);
    console.log(user);

}

