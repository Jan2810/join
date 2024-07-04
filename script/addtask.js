/**
 * Array of checked contacts.
 * @type {Array}
 */
let checkedContacts = [];

/**
 * Indicates if contacts task is open.
 * @type {boolean}
 */
let contactsTaskOpen = false;

/**
 * Array of urgency levels with their active states.
 * @type {Array<{urgency: string, active: boolean}>}
 */
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

/**
 * Object containing task data.
 * @type {{title: string, description: string, assigned_to: Array, due_date: string, priority: string, category: string, subtasks: Array, status: string, id: string}}
 */
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

/**
 * Array of available categories.
 * @type {Array<string>}
 */
let availableCategorys = [
    "Technical Task",
    "User Story"
];

/**
 * Initializes the task addition functionality.
 * @returns {Promise<void>}
 */
async function initAddTask() {
    await includeHTML();
    changeUrgency("mid");
    let status = localStorage.getItem("status");
    setStatus(status);
    setBackground(1);
};

/**
 * Handles click events.
 * @param {Event} event
 */
function handleClickEvent(event) {
    closeContacts(event);
    closeCategorys(event);
    closeSubtasks(event);
    hideMaxContacts(event);
    formValidationFeedbackOff();
};

/**
 * Changes the urgency level.
 * @param {string} urg - The urgency level to set.
 */
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
    changeBgBtn();
};

/**
 * Clears the task data array.
 */
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

/**
 * Renders the task list.
 */
function renderTaskList() {
    let content = document.getElementById("dropdownCategorys");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        const category = availableCategorys[i];
        content.innerHTML += returnTaskListHTML(category, i);
    }
};

/**
 * Adds a category to the task.
 * @param {number} i - The index of the category to add.
 */
function addCategory(i) {
    if (taskData.category === "") {
        taskData.category = availableCategorys[i];
    } else {
        taskData.category = "";
        taskData.category = availableCategorys[i];
    }
    document.getElementById("categoryInput").value = `${taskData.category}`;
};

/**
 * Opens the contacts list.
 * @returns {Promise<void>}
 */
async function openContacts() {
    if (contactsTaskOpen === false) {
        displayContacts("open");
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

/**
 * Closes the contacts list.
 * @param {Event} event
 */
function closeContacts(event) {
    if (contactsTaskOpen === true && event) {
        event.stopPropagation();
        displayContacts("close");
        contactsTaskOpen = false;
    }
};

/**
 * Renders the contact list.
 * @returns {Promise<void>}
 */
async function renderContactList() {
    let content = document.getElementById("dropdownMenu");
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    content.innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += returnContactList(contact, i);
        checkAssignments(i);
    }
};

/**
 * Checks the assignments.
 * @param {number} i
 */
function checkAssignments(i) {
    if (checkedContacts[i] === true) {
        displayAssignments("checked", i);
    } else if (checkedContacts[i] === false) {
        displayAssignments("unchecked", i);
    }
};

/**
 * Assigns a contact.
 * @param {number} i
 * @returns {Promise<void>}
 */
async function assignContact(i) {
    let trueContacts = checkedContacts.filter(checkedContact => checkedContact === true);
    if (trueContacts.length < 12) {
        if (checkedContacts[i] === true) {
            checkedContacts[i] = false;
        } else if (checkedContacts[i] === false) {
            checkedContacts[i] = true;
        }
        renderSignList();
        checkAssignments(i);
    } else {
        showMaxContacts();
    }
};

/**
 * Renders the sign list.
 * @returns {Promise<void>}
 */
async function renderSignList() {
    let content = document.getElementById("signContainer");
    controlCheckedLength();
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (checkedContacts[i] === true) {
            content.innerHTML += returnSignList(contact, i);
        }
    }
};

/**
 * Controls the checked length.
 */
function controlCheckedLength() {
    let container = document.getElementById("signContainer");
    let trueCount = checkedContacts.filter(value => value === true).length;
    if (trueCount >= 1) {
        container.style.display = "";
    } else if (trueCount < 1) {
        container.style.display = "none";
    }
};

/**
 * Adds a subtask.
 */
function addSubtask() {
    let input = document.getElementById("subtasksInput").value;
    if (input !== "" && taskData.subtasks.length < 4) {
        let subtaskArray = { text: `${input}`, status: "unchecked" };
        taskData.subtasks.push(subtaskArray);
        hideWarning();
        renderSubtasks();
    } else {
        showWarning();
    }
    if (taskData.subtasks.length === 4) {
        document.getElementById("requiredSubtext").style.display = "block";
        document.getElementById("requiredSubtext").innerHTML = "You reached the maximum number of tasks";
    }
};

/**
 * Renders the subtasks.
 */
function renderSubtasks() {
    container = document.getElementById("addedSubtasks");
    container.innerHTML = "";
    for (let i = 0; i < taskData.subtasks.length; i++) {
        const subtask = taskData.subtasks[i];
        container.innerHTML += returnSubtasksList(subtask, i);
    }
};

/**
 * Edits a subtask.
 * @param {number} i
 */
function editSubtask(i) {
    document.getElementById(`subtask${i}`).innerHTML = returnEditSubtaskHTML(i);
    document.getElementById("editedValue").focus();
    document.getElementById("editedValue").select();
};

/**
 * Checks the edit key.
 * @param {KeyboardEvent} ev
 * @param {number} i
 */
function checkEditKey(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtask(i);
    }
};

/**
 * Deletes a subtask.
 * @param {number} i
 */
function deleteSubtask(i) {
    taskData.subtasks.splice(i, 1);
    renderSubtasks();
};

/**
 * Saves a subtask.
 * @param {number} i
 */
function saveSubtask(i) {
    let subtask = document.getElementById("editedValue").value;
    let subtaskArray = { text: subtask, status: "unchecked" };
    taskData.subtasks[i] = subtaskArray;
    renderSubtasks();
};

/**
 * Checks the key for adding a subtask.
 * @param {KeyboardEvent} ev
 */
function checkKey(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtask();
    }
};

/**
 * Opens the subtasks input field.
 */
function openSubtasks() {
    let imgContainer = document.getElementById("subtaskImgCont");
    document.getElementById("subtasksInput").focus();
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = returnSubtaskImg();
};

/**
 * Closes the subtasks input field.
 * @param {Event} ev
 */
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

/**
 * Clears the input field for subtasks.
 */
function clearInputfield() {
    document.getElementById("subtasksInput").value = "";
    hideWarning();
};

/**
 * Clears all input fields and resets task data.
 */
function clearAll() {
    clearAllInputs();
    checkedContacts = [];
    clearTaskDataArray();
    renderSignList();
    changeUrgency("mid");
    renderSubtasks();
};

/**
 * Clears all input fields.
 */
function clearAllInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("categoryInput").value = "Select task category";
};

/**
 * Gets assigned contacts and updates task data.
 * @param {Array} contacts
 * @returns {Promise<void>}
 */
async function getAssignedContacts(contacts) {
    if (checkedContacts.length > 0) {
        for (let i = 0; i < checkedContacts.length; i++) {
            const assignedContact = checkedContacts[i];
            if (assignedContact == true) {
                taskData.assigned_to.push(contacts[i]);
            }
        }
    } else {
        taskData.assigned_to = "";
    }
};

/**
 * Gets the urgency level and updates task data.
 */
function getUrgency() {
    for (let i = 0; i < activeUrg.length; i++) {
        const urg = activeUrg[i];
        if (urg.active === true) {
            taskData.priority = urg.urgency;
        }
    }
};

/**
 * Shows successful addition message.
 */
function succesfullAdded() {
    document.getElementById("succesImgCnt").style.display = "flex";
    void document.getElementById("succesImg").offsetWidth;
    document.getElementById("succesImg").style.transform = "translateY(0px)";
};

/**
 * Closes the successful addition message.
 */
function succesfullAddedClose() {
    document.getElementById("succesImgCnt").style.display = "none";
    void document.getElementById("succesImg").offsetWidth;
    document.getElementById("succesImg").style.transform = "translateY(500px)";
};

/**
 * Adds a new task.
 * @returns {Promise<void>}
 */
async function addNewTask() {
    document.getElementById("createButton").onclick = "";
    document.getElementById("createButton").disabled = true;
    saveInputValues();
};

/**
 * Saves input values and posts the new task.
 * @returns {Promise<void>}
 */
async function saveInputValues() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let due_date = document.getElementById("taskDate").value;
    let category = document.getElementById("categoryInput").value;
    if (title.length >= 1 && due_date.length >= 1 && category.length >= 1) {
        formValidationFeedbackOff();
        await postNewTask(title, due_date, description, category);
    }
};

/**
 * Handles form validation feedback.
 */
function handleFormValidation() {
    let title = document.getElementById("taskTitle").value;
    let due_date = document.getElementById("taskDate").value;
    let category = document.getElementById("categoryInput").value;
    if (title.length >= 1 || due_date.length >= 1 || category.length >= 1) {
        formValidationFeedbackOff();
    } else {
        formValidationFeedbackOn();
    }
};

/**
 * Posts the new task.
 * @param {string} title
 * @param {string} due_date
 * @param {string} description
 * @param {string} category
 * @returns {Promise<void>}
 */
async function postNewTask(title, due_date, description, category) {
    await postingTask(title, due_date, description, category);
    succesfullAdded();
    setTimeout(() => {
        getLocationAndMove();
    }, 1500);
};

/**
 * Handles posting the task data.
 * @param {string} title
 * @param {string} due_date
 * @param {string} description
 * @param {string} category
 * @returns {Promise<void>}
 */
async function postingTask(title, due_date, description, category) {
    await setTaskData(title, due_date, description, category);
    await postData(TASKS_URL, taskData);
    clearAll();
};

/**
 * Sets the task data.
 * @param {string} title
 * @param {string} due_date
 * @param {string} description
 * @param {string} category
 * @returns {Promise<void>}
 */
async function setTaskData(title, due_date, description, category) {
    let contacts = await loadData(CONTACTS_URL);
    if (taskData.subtasks.length === 0) {
        taskData.subtasks = "";
    }
    getAssignedContacts(contacts);
    getUrgency();
    taskData.title = title;
    taskData.description = description;
    taskData.due_date = due_date;
    taskData.category = category;
    taskData.id = "";
};

/**
 * Gets the current location and redirects as needed.
 */
function getLocationAndMove() {
    let location = window.location;
    if (location.pathname == "/html/board.html") {
        closeNewTaskInBoard();
        succesfullAddedClose();
        getTasks();
    } else if (location.pathname == "/html/addtask.html") {
        window.location = "../html/board.html";
    }
};
