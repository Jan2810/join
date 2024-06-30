const USERS_URL = "https://join-14fdc-default-rtdb.europe-west1.firebasedatabase.app/";
const TASKS_URL = "https://join-tasks-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACTS_URL = "https://join---contacts-default-rtdb.europe-west1.firebasedatabase.app/";
let users = [];
let activeUser = {};
let activePage = [
    false,
    false,
    false,
    false,
    false,
    false
];

let navOpen = false;

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

async function initPrivate() {
    await includeHTML();
    setBackground(4)
}

async function initLegal() {
    await includeHTML();
    setBackground(5);
}

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
    try {
        let response = await fetch(url + ".json");
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        let data = await response.json();
        if (!data) {
            return []
        }
        let dataArray = Object.keys(data).map(key => {
            return {
                id: key,   // Hier fügen wir den Firebase-Schlüssel als ID hinzu
                ...data[key]  // Und fügen alle anderen Daten hinzu
            };
        });
        // console.log(dataArray);
        return dataArray;
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
};

async function postData(url, data = {}) {
    let response = await fetch(url + ".json", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let responseData = await response.json();
    let id = responseData.name;
    data.id = id;
    await fetch(`${url}/${id}.json`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return data;
}

// async function putData(url, data = {}) {
//     let response = await fetch(url + ".json", {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return response;
// };

async function putData(url, dataArray = []) {
    console.log(dataArray);
    let data = dataArray.reduce((acc, item) => {
        let { id, ...rest } = item;
        acc[id] = rest;
        return acc;
    }, {});
    let response = await fetch(url + ".json", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response;
};

async function putDataObject(url, data, id) {
    let response = await fetch(`${url}/${id}.json`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    console.log(JSON.stringify(data));
    return response;
};


async function deleteData(url, id) {
    let response = await fetch(`${url}/${id}.json`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        }
    });
    return response;
};

function formatDate(dateString) {
    let parts = dateString.split("-");
    return `${parts[2]} ${getMonthName(parts[1])} ${parts[0]}`;
};

function getMonthName(monthNumber) {
    const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
    return monthNames[monthNumber - 1];
};

function stopProp(ev) {
    ev.stopPropagation();
};

function preventDf(ev) {
    ev.preventDefault();
};

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            document.getElementById("userInitials").innerHTML = getInitials(activeUser.name);
        } else {
            element.innerHTML = 'Page not found';
        }
    }
};

function saveUser() {
    const userString = JSON.stringify(activeUser);
    console.log(userString);
    localStorage.setItem('user', userString);
};

function loadUser() {
    const retrievedUserString = localStorage.getItem('user');
    if (retrievedUserString) {
        activeUser = JSON.parse(retrievedUserString);
        console.log("Nutzer gefunden");
        console.log(activeUser.name);
    }
    else {
        window.location.href = "../index.html";
    }
};

if (window.location.pathname.includes('/html/') && !window.location.pathname.includes('register')) {
    loadUser();
};

function logout() {
    localStorage.removeItem('user');
    activeUser = "";
    goTologin();
};

function guestUserActive() {
    activeUser.name = "Gast Nutzer";
    saveUser(activeUser);
    goToBoard();
};

function getInitials(name) {
    const nameParts = name.trim().split(/\s+/);
    const initials = nameParts.map(part => part[0].toUpperCase()).join('');
    return initials;
};

function goToBoard() {
    window.location.href = "./html/summary.html"
};

function goTologin() {
    window.location.href = "../index.html"
};

function setBackground(i) {
    activePage = [
        false,
        false,
        false,
        false,
        false,
        false
    ];
    activePage[i] = true;
    changeBackground(i);
};

function changeBackground(i) {
    console.log(i);
    if (i <= 3) {
        document.getElementById(`navLink${i}`).style.backgroundColor = "#12223f"
    } else if (i >= 4) {
        document.getElementById(`navLink${i}`).style.color = "#29ABE2"
        document.getElementById(`navLink${i}`).style.fontWeight = "bold"
    }
};