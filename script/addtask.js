let activeUrg = {
    "high": false,
    "mid": false,
    "low": false
}

// let contacts = [
//     {
//         "name": "Sofia Müller",
//         "sign": "SM",
//         "color": "background: rgba(0, 190, 232, 1)",
//         "checked": false,
//         "userAccount": true
//     },
//     {
//         "name": "Anton Mayer",
//         "sign": "AM",
//         "color": "background: rgba(255, 122, 0, 1)",
//         "checked": false,
//         "userAccount": false
//     },
//     {
//         "name": "Anja Schulz",
//         "sign": "AS",
//         "color": "background: rgba(147, 39, 255, 1)",
//         "checked": false,
//         "userAccount": false
//     },
//     {
//         "name": "Benedikt Ziegler",
//         "sign": "BZ",
//         "color": "background: rgba(110, 82, 255, 1)",
//         "checked": false,
//         "userAccount": false
//     },
//     {
//         "name": "David Eisenberg",
//         "sign": "DE",
//         "color": "background: rgba(252, 113, 255, 1)",
//         "checked": false,
//         "userAccount": false
//     }
// ];

let taskData = [
    {
        "title": "",
        "description": "",
        "assigned_to": [],
        "due_date": "",
        "priority": "",
        "category": "",
        "subtasks": [],
        "status": ""
    }
];


let signList = [];

async function initAddTask() {
    await includeHTML();
    changeUrgency("mid")
};

function changeUrgency(urg) {
    if (urg === "high") {
        activeUrg.high = true;
        activeUrg.mid = false;
        activeUrg.low = false;
    } else if (urg === "mid") {
        activeUrg.high = false;
        activeUrg.mid = true;
        activeUrg.low = false;
    } else if (urg === "low") {
        activeUrg.high = false;
        activeUrg.mid = false;
        activeUrg.low = true;
    }
    changeBgOfBtn()
};

function changeBgOfBtn() {
    if (activeUrg.high === true) {
        document.getElementById("high").classList.add("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-white.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
    }
    if (activeUrg.mid === true) {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.add("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-white.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
    }
    if (activeUrg.low === true) {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.add("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-white.png`;
    }
};


function hoverBtn(boolean, id) {
    if (boolean === true && id === "img-high") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-white.png";
    } else if (boolean === false && id === "img-high" && activeUrg.high === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-color.png";
    }
    if (boolean === true && id === "img-mid") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && id === "img-mid" && activeUrg.mid === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-color.png";
    }
    if (boolean === true && id === "img-low") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && id === "img-low" && activeUrg.low === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-color.png";
    }
};

function stopProp(ev) {
    ev.stopPropagation();
}

function enterIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-blue.png";
};

function outIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-black.png";
};

function openCalender() {
    document.getElementById("taskDate").showPicker();
    document.getElementById("taskDate").style.color = "black";
};


function openContacts() {
    document.getElementById("dropdownToggle").style.display = "none";
    document.getElementById("dropdownInput").style.display = "block";
    document.getElementById("dropdownMenu").style.display = "block";
    renderContactList();
};

function closeContacts() {
    document.getElementById("dropdownToggle").style.display = "flex";
    document.getElementById("dropdownInput").style.display = "none";
    document.getElementById("dropdownMenu").style.display = "none";
    document.getElementById("dropdownInput").value = "";
};

async function renderContactList() {
    let content = document.getElementById("dropdownMenu");
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    console.log(contacts);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        // content.innerHTML += returnContactList(contact, i);
        // checkAssignments(i);
    }
};

function returnContactList(cnt, i) {
    return `
        <div onclick="assignContact(${i})" class="dropdown-item" id="cntnum${i}" data-value="${i + 1}">
            <div class="task-cnt-sign" id="contactsign${i}" style='${cnt.color}'>${getNameSign(contact.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimg${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
};

function renderSignList() {
    let content = document.getElementById("signContainer");
    content.style.display = "";
    content.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.checked === true) {
            content.innerHTML += `
           <div class="task-cnt-assigned-sign">
                <div class="task-cnt-sign flex-center" id="contactsign${i}" style='${contact.color}'>
                ${contact.sign}
                </div>
           </div>`;
        }
    }
}

function checkAssignments(i) {
    if (contacts[i].checked === true) {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-checked.png";
        document.getElementById(`cntnum${i}`).classList.add("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.add("task-hover-dark");
        document.getElementById(`cntnum${i}`).classList.add("color-white");
    } else if (contacts[i].checked === false) {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-unchecked.png";
        document.getElementById(`cntnum${i}`).classList.remove("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.remove("color-white");
    }
};

function assignContact(i) {
    if (contacts[i].checked === true) {
        contacts[i].checked = false;
    } else if (contacts[i].checked === false) {
        contacts[i].checked = true;
    }
    renderContactList();
    renderSignList();
};