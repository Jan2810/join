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

function renderTaskList() {
    let content = document.getElementById("dropdownCategorys");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        const category = availableCategorys[i];
        content.innerHTML += returnTaskListHTML(category, i);
    }
};

function addCategory(i) {
    if (taskData.category === "") {
        taskData.category = availableCategorys[i];
    } else {
        taskData.category = "";
        taskData.category = availableCategorys[i];
    }
    document.getElementById("categoryInput").value = `${taskData.category}`
};

async function openContacts() {
    if (contactsTaskOpen === false) {
        displayContacts("open")
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
        displayContacts("close");
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

function checkAssignments(i) {
    if (checkedContacts[i] === true) {
        displayAssignments("checked", i)
    } else if (checkedContacts[i] === false) {
        displayAssignments("unchecked", i)
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
    } else if (trueCount < 1) {
        container.style.display = "none";
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
        let subtaskArray = { text: `${input}`, status: "unchecked" }
        taskData.subtasks.push(subtaskArray);
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
        console.log(subtask);
        container.innerHTML += `
        <div id="subtask${i}">
            <div class="subtask-item">
                <li>${subtask.text}</li>
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
    console.log(taskData.subtasks);
    document.getElementById(`subtask${i}`).innerHTML = `
            <div onkeydown="checkEditKey(event, ${i})" class="edit-subtask-item">
                <input id="editedValue" type="text" class="editable-input" value="${taskData.subtasks[i].text}">
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
    let subtask = document.getElementById("editedValue").value
    let subtaskArray = { text: subtask, status: "unchecked" };
    taskData.subtasks[i] = subtaskArray;
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
    document.getElementById("categoryInput").value = "Select task category";
};

async function getAssignedContacts(contacts) {
    if (checkedContacts.length > 0) {
        for (let i = 0; i < checkedContacts.length; i++) {
            const assignedContact = checkedContacts[i];
            if (assignedContact == true) {
                taskData.assigned_to.push(contacts[i].name);
            }
        }
    } else {
        taskData.assigned_to = "";
    }
};

function getUrgency() {
    for (let i = 0; i < activeUrg.length; i++) {
        const urg = activeUrg[i];
        if (urg.active === true) {
            taskData.priority = urg.urgency;
        }
    }
};

function formValidationFeedbackOn() {
    document.getElementById("taskTitle").style.borderColor = "red";
    document.getElementById("requiredTitle").style.display = "";
    document.getElementById("taskDate").style.borderColor = "red";
    document.getElementById("requiredDate").style.display = "";
    document.getElementById("dropdownCategoryToggle").style.borderColor = "red";
    document.getElementById("requiredCategorys").style.display = "";
};

function formValidationFeedbackOff() {
    document.getElementById("taskTitle").style.borderColor = "";
    document.getElementById("requiredTitle").style.display = "none";
    document.getElementById("taskDate").style.borderColor = "";
    document.getElementById("requiredDate").style.display = "none";
    document.getElementById("dropdownCategoryToggle").style.borderColor = "";
    document.getElementById("requiredCategorys").style.display = "none";
};

async function addNewTask() {
    formValidationFeedbackOn();
    let contacts = await loadData(CONTACTS_URL);
    if (taskData.subtasks.length === 0) {
        taskData.subtasks = "";
    }
    title = document.getElementById("taskTitle").value;
    description = document.getElementById("taskDescription").value;
    due_date = document.getElementById("taskDate").value;
    category = document.getElementById("categoryInput").value;
    if (title.length > 1 && due_date.length > 1 && category.length > 1) {
        getAssignedContacts(contacts);
        getUrgency();
        taskData.title = title
        taskData.description = description
        taskData.due_date = due_date
        taskData.category = category
        taskData.status = "todo";
        console.log(taskData);
        postData(TASKS_URL, taskData);
        clearAll();
        formValidationFeedbackOff();
    }
    window.location = "../html/board.html";
};