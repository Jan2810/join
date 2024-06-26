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
    "status": "todo",
    "id": "",
};

let availableCategorys = [
    "Technical Task",
    "User Story"
];

async function initAddTask() {
    await includeHTML();
    changeUrgency("mid");
    let status = localStorage.getItem("status");
    setStatus(status);
    setBackground(1)
};

function handleClickEvent(event) {
    closeContacts(event); 
    closeCategorys(event); 
    closeSubtasks(event); 
    formValidationFeedbackOff();
}

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

function clearTaskDataArray() {
    taskData = {
        "title": "",
        "description": "",
        "assigned_to": [],
        "due_date": "",
        "priority": "",
        "category": "",
        "subtasks": [],
        "status": "todo"
    };
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

function addSubtask() {
    let input = document.getElementById("subtasksInput").value;
    if (input !== "" && taskData.subtasks.length < 4) {
        let subtaskArray = { text: `${input}`, status: "unchecked" }
        taskData.subtasks.push(subtaskArray);
        hideWarning();
        renderSubtasks();
    } else {
        showWarning();
    }
    if (taskData.subtasks.length === 4) {
        document.getElementById("requiredSubtext").style.display = "block";
        document.getElementById("requiredSubtext").innerHTML = "You reached the maximum number of tasks"
    }
};

function renderSubtasks() {
    container = document.getElementById("addedSubtasks")
    container.innerHTML = "";
    for (let i = 0; i < taskData.subtasks.length; i++) {
        const subtask = taskData.subtasks[i];
        container.innerHTML += returnSubtasksList(subtask, i);
    }
};

function editSubtask(i) {
    document.getElementById(`subtask${i}`).innerHTML = returnEditSubtaskHTML(i);
    document.getElementById("editedValue").focus()
    document.getElementById("editedValue").select()
};

function checkEditKey(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtask(i);
    }
};

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

function checkKeyEdit(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtaskEdit();
    }
};

function openSubtasks() {
    let imgContainer = document.getElementById("subtaskImgCont");
    document.getElementById("subtasksInput").focus();
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = returnSubtaskImg()
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
    hideWarning();
};

function clearAll() {
    clearAllInputs()
    checkedContacts = [];
    clearTaskDataArray();
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
                if (taskData.assigned_to.length <= 11)
                taskData.assigned_to.push(contacts[i]);
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

function succesfullAdded() {
    document.getElementById("succesImgCnt").style.display = "flex";
    void document.getElementById("succesImg").offsetWidth;
    document.getElementById("succesImg").style.transform = "translateY(0px)";
};

async function addNewTask() {
    document.getElementById("createButton").onclick = "";
    document.getElementById("createButton").disabled = true;
    saveInputValues();
};

async function saveInputValues() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let due_date = document.getElementById("taskDate").value;
    let category = document.getElementById("categoryInput").value;
    if (title.length >= 1 && due_date.length >= 1 && category.length >= 1) {
        formValidationFeedbackOff();
        await postNewTask(title, due_date, description, category)
    } else {
        formValidationFeedbackOn();
    }
};

async function postNewTask(title, due_date, description, category) {
    await postingTask(title, due_date, description, category);
    succesfullAdded();
    setTimeout(() => {
        getLocationAndMove();
    }, 1500);
};

async function postingTask(title, due_date, description, category) {
    await setTaskData(title, due_date, description, category);
    await postData(TASKS_URL, taskData);
    clearAll();
}

async function setTaskData(title, due_date, description, category) {
    let contacts = await loadData(CONTACTS_URL);
    if (taskData.subtasks.length === 0) {
        taskData.subtasks = "";
    }
    getAssignedContacts(contacts);
    getUrgency();
    taskData.title = title
    taskData.description = description
    taskData.due_date = due_date
    taskData.category = category
    taskData.id = "";
};

function getLocationAndMove() {
    if (window.location = "../html/board.html") {
        closeNewTaskInBoard();
    } else {
        window.location = "../html/board.html";
    }
};