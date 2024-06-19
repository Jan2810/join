let activeUrg = {
    "high": false,
    "mid": false,
    "low": false
}

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

let availableCategorys = [
    "Technical Task",
    "User Story"
];

let checkedContacts = [];

let contactsTaskOpen = false;

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
    changeBgBtn()
};

function changeBgBtn() {
    if (activeUrg.high === true) {
        highlightButtonHigh();
    }
    if (activeUrg.mid === true) {
        highlightButtonMid();
    }
    if (activeUrg.low === true) {
        highlightButtonLow();
    }
};

function highlightButtonHigh() {
    document.getElementById("high").classList.add("high-focus");
    document.getElementById("mid").classList.remove("mid-focus");
    document.getElementById("low").classList.remove("low-focus");
    document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-white.png`;
    document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
    document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
};

function highlightButtonMid() {
    document.getElementById("high").classList.remove("high-focus");
    document.getElementById("mid").classList.add("mid-focus");
    document.getElementById("low").classList.remove("low-focus");
    document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
    document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-white.png`;
    document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
};

function highlightButtonLow() {
    document.getElementById("high").classList.remove("high-focus");
    document.getElementById("mid").classList.remove("mid-focus");
    document.getElementById("low").classList.add("low-focus");
    document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
    document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
    document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-white.png`;
}


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

function openCategorys() {
    document.getElementById("dropdownCategoryToggle").style.display = "none";
    document.getElementById("dropdownCategoryContainer").style.display = "";
    document.getElementById("dropdownCategorys").style.display = "flex";
    renderTaskList();
};

function closeCategorys(ev) {
    ev.stopPropagation();
    document.getElementById("dropdownCategoryToggle").style.display = "";
    document.getElementById("dropdownCategoryContainer").style.display = "none";
    document.getElementById("dropdownCategorys").style.display = "none";
};

function renderTaskList() {
    let content = document.getElementById("dropdownCategorys");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        const category = availableCategorys[i];
        content.innerHTML += `
        <div onclick="addCategory(${i}); closeCategorys(event);" class="category-dd-item" id="ctg${i}">
            <div class="task-cnt-name">${category}</div>
        </div>
        `;
    }
};

function addCategory(i) {
    if (taskData.category === "") {
        taskData.category = availableCategorys[i];
    } else {
        taskData.category = "";
        taskData.category = availableCategorys[i];
    }
    document.getElementById("selectedTask").innerHTML = `${taskData.category}`;
}

async function openContacts() {
    if (contactsTaskOpen === false) {
        document.getElementById("dropdownToggle").style.display = "none";
        document.getElementById("dropdownMenuContainer").style.display = "";
        document.getElementById("dropdownMenu").style.display = "block";
        renderContactList();
        let contacts = await loadData(CONTACTS_URL);
        for (let i = 0; i < contacts.length; i++) {
            if (contacts.length > checkedContacts.length) {
                const count = checkedContacts.push(false);
            }
        }
        contactsTaskOpen = true;
    }
};

function closeContacts(event) {
    if (contactsTaskOpen === true) {
        event.stopPropagation();
        document.getElementById("dropdownToggle").style.display = "flex";
        document.getElementById("dropdownMenuContainer").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
        contactsTaskOpen = false;
    }
};

async function renderContactList() {
    let content = document.getElementById("dropdownMenu");
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    content.innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        content.innerHTML += returnContactList(contact, i)
        checkAssignments(i);
    }
};

function returnContactList(cnt, i) {
    return `
        <div onclick="assignContact(${i})" class="dropdown-item" id="cntnum${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsign${i}" style='${backgroundColors[i]}'>${getNameSign(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimg${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
};

function checkAssignments(i) {
    if (checkedContacts[i] === true) {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-checked.png";
        document.getElementById(`cntnum${i}`).classList.add("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.add("task-hover-dark");
        document.getElementById(`cntnum${i}`).classList.add("color-white");
    } else if (checkedContacts[i] === false) {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-unchecked.png";
        document.getElementById(`cntnum${i}`).classList.remove("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.remove("color-white");
        document.getElementById(`cntnum${i}`).classList.remove("task-hover-dark");
    }
};

function assignContact(i) {
    if (checkedContacts[i] === true) {
        checkedContacts[i] = false;
    } else if (checkedContacts[i] === false) {
        checkedContacts[i] = true;
    }
    renderSignList();
    checkAssignments(i);
};

async function renderSignList() {
    let content = document.getElementById("signContainer");
    controlCheckedLength();
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (checkedContacts[i] === true) {
            content.innerHTML += returnSignList(contact, i)
        }
    }
};

function controlCheckedLength() {
    let container = document.getElementById("signContainer");
    let trueCount = checkedContacts.filter(value => value === true).length;
    if (trueCount >= 1) {
        container.style.display = "";
        document.getElementById("taskRightCont").classList.add("task-margin-top");
    } else if (trueCount < 1) {
        container.style.display = "none";
        document.getElementById("taskRightCont").classList.remove("task-margin-top");
    }
};

function returnSignList(cnt, i) {
    return `
           <div class="task-cnt-assigned-sign">
                <div class="task-cnt-sign flex-center" id="contactsign${i}" style='${backgroundColors[i]}'>
                ${getNameSign(cnt.name)}
                </div>
           </div>`;
}