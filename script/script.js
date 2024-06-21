const USERS_URL = "https://join-14fdc-default-rtdb.europe-west1.firebasedatabase.app/";
const TASKS_URL = "https://join-tasks-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACTS_URL = "https://join---contacts-default-rtdb.europe-west1.firebasedatabase.app/";
let users = [];
let user = {};

let navOpen = false;

function toggleNav() {
    let subMenu = document.querySelector(".submenu");
    subMenu.classList.toggle("d-none");
    subMenu.classList.toggle("display-column");
    navOpen = !navOpen;
    console.log(navOpen);
    document.removeEventListener("click", toggleNav);
    if (navOpen) {
        setTimeout(() => {
            document.addEventListener("click", toggleNav);
        }, 0);
    }
};

async function loadData(url) {
    let response = await fetch(url + ".json");
    let data = await response.json();
    let dataArray = Object.keys(data).map(key => data[key]);
    return dataArray;
};

async function postData(url, data = {}) {
    let response = await fetch(url + ".json", {
        method: "POST",
        header: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response;
};

function getNameSign(name) {
    let splittetName = name.split(" ");
    let firstLetter = splittetName[0].charAt(0).toUpperCase();
    let secondLetter = splittetName[1].charAt(0).toUpperCase();
    return `${firstLetter}${secondLetter}`;
};

let backgroundColors = [
    "background: rgba(255, 122, 0, 1)",
    "background: rgba(255, 94, 179, 1)",
    "background: rgba(110, 82, 255, 1)",
    "background: rgba(147, 39, 255, 1)",
    "background: rgba(0, 190, 232, 1)",
    "background: rgba(31, 215, 193, 1)",
    "background: rgba(255, 116, 94, 1)",
    "background: rgba(255, 163, 94, 1)",
    "background: rgba(252, 113, 255, 1)",
    "background: rgba(255, 199, 1, 1)",
    "background: rgba(0, 56, 255, 1)",
    "background: rgba(195, 255, 43, 1)",
    "background: rgba(255, 230, 43, 1)",
    "background: rgba(255, 70, 70, 1)",
    "background: rgba(255, 187, 43, 1)"
];

function stopProp(ev) {
    ev.stopPropagation();
};

function preventDf(ev) {
    ev.preventDefault();
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
};


function saveUser() {
    const userString = JSON.stringify(user);
    console.log(userString);
    localStorage.setItem('user', userString);
};

function loadUser() {
    const retrievedUserString = localStorage.getItem('user');
    user = JSON.parse(retrievedUserString);
    console.log(user);
};


