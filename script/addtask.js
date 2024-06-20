let checkedContacts = [];
let contactsTaskOpen = false;

let activeUrg = [
    {
        "urgency": "high",
        "active": false
    },
    {
        "urgency": "mid",
        "active": false
    },
    {
        "urgency": "low",
        "active": false
    }
];

let taskData = {
    "title": "",
    "description": "",
    "assigned_to": [],
    "due_date": "",
    "priority": "",
    "category": "",
    "subtasks": [],
    "status": ""
};

let availableCategorys = [
    "Technical Task",
    "User Story"
];

async function initAddTask() {
    await includeHTML();
    changeUrgency("mid");
};
function changeUrgency(urg) {
    if (urg === "high") {
        activeUrg[0].active = true;
        activeUrg[1].active = false;
        activeUrg[2].active = false;
    } else if (urg === "mid") {
        activeUrg[0].active = false;
        activeUrg[1].active = true;
        activeUrg[2].active = false;
    } else if (urg === "low") {
        activeUrg[0].active = false;
        activeUrg[1].active = false;
        activeUrg[2].active = true;
    }
    changeBgBtn()
};

function changeBgBtn() {
    if (activeUrg[0].active === true) {
        highlightButtonHigh();
    }
    if (activeUrg[1].active === true) {
        highlightButtonMid();
    }
    if (activeUrg[2].active === true) {
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
};

function showWarning() {
    document.getElementById("subtasksInput").value = "";
    document.getElementById("subtaskInputCont").style.borderColor = "";
    document.getElementById("requiredSubtext").style.display = "none";
};

function hideWarning() {
    document.getElementById("subtaskInputCont").style.borderColor = "red";
    document.getElementById("requiredSubtext").style.display = "block";
    document.getElementById("subtasksInput").focus();
};

function hoverBtn(boolean, id) {
    if (boolean === true && id === "img-high") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-white.png";
    } else if (boolean === false && id === "img-high" && activeUrg[0].active === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-color.png";
    }
    if (boolean === true && id === "img-mid") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && id === "img-mid" && activeUrg[1].active === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-color.png";
    }
    if (boolean === true && id === "img-low") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && id === "img-low" && activeUrg[2].active === false) {
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
};

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

async function assignContact(i) {
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
};

function addSubtask() {
    let input = document.getElementById("subtasksInput").value;
    if (input !== "" && taskData.subtasks.length < 4) {
        taskData.subtasks.push(input);
        showWarning();
        renderSubtasks();
    } else {
        hideWarning
    }
    if (taskData.subtasks.length === 4) {
        document.getElementById("requiredSubtext").style.display = "block";
        requiredSubtext.innerHTML = "You reached the maximum number of tasks"
    }
};

function renderSubtasks() {
    container = document.getElementById("addedSubtasks")
    container.innerHTML = "";
    for (let i = 0; i < taskData.subtasks.length; i++) {
        const subtask = taskData.subtasks[i];
        container.innerHTML += `
        <div id="subtask${i}">
            <div class="subtask-item">
                <li>${subtask}</li>
                <div class="img-cont-subtask flex-center">
                    <div onclick="editSubtask(${i})" class="img-cont-subtask-first img-cont-subtask">
                        <img src="../assets/icons/edit.png" alt="">
                    </div>
                    <div onclick="deleteSubtask(${i})" class="img-cont-subtask-last">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>
                </div>
            </div>
        </div>
       `;
    }
};

function editSubtask(i) {
    document.getElementById(`subtask${i}`).innerHTML = `
            <div onkeydown="checkEditKey(event, ${i})" class="edit-subtask-item">
                <input id="editedValue" type="text" class="editable-input" value="${taskData.subtasks[i]}">
                <div class="img-cont-subtask flex-center">
                    <div onclick="deleteSubtask(${i})" class="img-cont-subtask-first img-cont-subtask">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>
                    <div onclick="saveSubtask(${i})" class="img-cont-subtask-last">
                        <img src="../assets/icons/hook-small-dark.png" alt="">
                    </div>
                </div>
            </div>
    `;
    document.getElementById("editedValue").focus()
    document.getElementById("editedValue").select()
}
function checkEditKey(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtask(i);
    }
}

function deleteSubtask(i) {
    taskData.subtasks.splice(i, 1);
    renderSubtasks();
};

function saveSubtask(i) {
    taskData.subtasks[i] = document.getElementById("editedValue").value;
    renderSubtasks();
};

function checkKey(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtask();
    }
};

function openSubtasks() {
    let imgContainer = document.getElementById("subtaskImgCont");
    document.getElementById("subtasksInput").focus();
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = `
    <div onclick="clearInputfield()" class=" img-cont-subtask-first-n img-cont-subtask">
        <img src="../assets/icons/x-black.png" alt="">
    </div>
    <div onclick="addSubtask()" class="img-cont-subtask">
        <img src="../assets/icons/hook-small-dark.png" alt="">
    </div>
    `;
};

function closeSubtasks(ev) {
    ev.stopPropagation();
    document.getElementById("subtaskInputCont").style.borderColor = "";
    document.getElementById("requiredSubtext").style.display = "none";
    let imgContainer = document.getElementById("subtaskImgCont");
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = `
    <div class="img-cont-subtask">
        <img src="../assets/icons/add.png" alt="">
    </div>
    `;
};

function clearInputfield() {
    document.getElementById("subtasksInput").value = "";
};

function clearAll() {
    clearAllInputs()
    checkedContacts = [];
    taskData = {
        "title": "",
        "description": "",
        "assigned_to": [],
        "due_date": "",
        "priority": "",
        "category": "",
        "subtasks": [],
        "status": ""
    };
    renderSignList();
    changeUrgency("mid");
    renderSubtasks();
};

function clearAllInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("selectedTask").innerHTML = "Select task category";
};

async function getAssignedContacts() {
    let contacts = await loadData(CONTACTS_URL);
    console.log(checkedContacts);
    if (checkedContacts.length > 0) {
        for (let i = 0; i < checkedContacts.length; i++) {
            const assignedContact = checkedContacts[i];
            console.log(assignedContact);
            if (assignedContact === true) {
                taskData.assigned_to.push(contacts[i])
            }
        }
    } else {
        console.log("false");
    }
};

function getUrgency() {
    for (let i = 0; i < activeUrg.length; i++) {
        const urg = activeUrg[i];
        if (urg.active === true) {
            console.log();
            taskData.priority = urg.urgency;
        }
    }
};

async function addNewTask() {
    getAssignedContacts();
    getUrgency();
    taskData.title = document.getElementById("taskTitle").value;
    taskData.description = document.getElementById("taskDescription").value;
    taskData.due_date = document.getElementById("taskDate").value;
    taskData.category = document.getElementById("selectedTask").innerHTML;
    taskData.status = "todo";
    console.log(taskData);
    clearAll();
};