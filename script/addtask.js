/**
 * @type {boolean[]} Array to keep track of checked contacts
 */
let checkedContacts = [];
/**
 * @type {boolean} Flag to check if contacts task is open
 */
let contactsTaskOpen = false;

/**
 * @typedef {Object} Urgency
 * @property {string} urgency - The urgency level
 * @property {boolean} active - Flag to check if the urgency is active
 */

/**
 * @type {Urgency[]} Array to store urgency levels
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
 * @typedef {Object} TaskData
 * @property {string} title - The title of the task
 * @property {string} description - The description of the task
 * @property {string[]} assigned_to - List of assigned contacts
 * @property {string} due_date - The due date of the task
 * @property {string} priority - The priority of the task
 * @property {string} category - The category of the task
 * @property {Object[]} subtasks - List of subtasks
 * @property {string} status - The status of the task
 * @property {string} id - The ID of the task
 */

/**
 * @type {TaskData} Object to store task data
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
 * @type {string[]} Array to store available categories
 */
let availableCategorys = [
    "Technical Task",
    "User Story"
];

/**
 * Initialize the task addition process
 */
async function initAddTask() {
    await includeHTML();
    changeUrgency("mid");
    let status = localStorage.getItem("status");
    setStatus(status);
    setBackground(1);
}

/**
 * Handle click events
 * @param {Event} event - The event object
 */
function handleClickEvent(event) {
    closeContacts(event);
    closeCategorys(event);
    closeSubtasks(event);
    hideMaxContacts(event);
    formValidationFeedbackOff();
}

/**
 * Change the urgency of the task
 * @param {string} urg - The urgency level
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
}

/**
 * Clear the task data array
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
}

/**
 * Render the task list
 */
function renderTaskList() {
    let content = document.getElementById("dropdownCategorys");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        const category = availableCategorys[i];
        content.innerHTML += returnTaskListHTML(category, i);
    }
}

/**
 * Add a category to the task
 * @param {number} i - The index of the category
 */
function addCategory(i) {
    if (taskData.category === "") {
        taskData.category = availableCategorys[i];
    } else {
        taskData.category = "";
        taskData.category = availableCategorys[i];
    }
    document.getElementById("categoryInput").value = `${taskData.category}`;
}

/**
 * Open the contacts dropdown
 */
async function openContacts() {
    if (!contactsTaskOpen) {
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
}

/**
 * Close the contacts dropdown
 * @param {Event} event - The event object
 */
function closeContacts(event) {
    if (contactsTaskOpen && event) {
        event.stopPropagation();
        displayContacts("close");
        contactsTaskOpen = false;
    }
}

/**
 * Render the contact list
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
}

/**
 * Check the assignments of the contacts
 * @param {number} i - The index of the contact
 */
function checkAssignments(i) {
    if (checkedContacts[i]) {
        displayAssignments("checked", i);
    } else {
        displayAssignments("unchecked", i);
    }
}

/**
 * Assign a contact to the task
 * @param {number} i - The index of the contact
 */
async function assignContact(i) {
    let trueContacts = checkedContacts.filter(checkedContact => checkedContact === true);
    if (trueContacts.length < 12) {
        if (checkedContacts[i]) {
            checkedContacts[i] = false;
        } else {
            checkedContacts[i] = true;
        }
        renderSignList();
        checkAssignments(i);
    } else {
        showMaxContacts();
    }
}

/**
 * Render the assigned contacts list
 */
async function renderSignList() {
    let content = document.getElementById("signContainer");
    controlCheckedLength();
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (checkedContacts[i]) {
            content.innerHTML += returnSignList(contact, i);
        }
    }
}

/**
 * Control the length of the checked contacts
 */
function controlCheckedLength() {
    let container = document.getElementById("signContainer");
    let trueCount = checkedContacts.filter(value => value === true).length;
    if (trueCount >= 1) {
        container.style.display = "";
    } else {
        container.style.display = "none";
    }
}

/**
 * Add a subtask to the task
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
}

/**
 * Render the subtasks list
 */
function renderSubtasks() {
    let container = document.getElementById("addedSubtasks");
    container.innerHTML = "";
    for (let i = 0; i < taskData.subtasks.length; i++) {
        const subtask = taskData.subtasks[i];
        container.innerHTML += returnSubtasksList(subtask, i);
    }
}

/**
 * Edit a subtask
 * @param {number} i - The index of the subtask
 */
function editSubtask(i) {
    document.getElementById(`subtask${i}`).innerHTML = returnEditSubtaskHTML(i);
    document.getElementById("editedValue").focus();
    document.getElementById("editedValue").select();
}

/**
 * Check the key pressed for editing subtasks
 * @param {KeyboardEvent} ev - The keyboard event
 * @param {number} i - The index of the subtask
 */
function checkEditKey(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtask(i);
    }
}

/**
 * Delete a subtask
 * @param {number} i - The index of the subtask
 */
function deleteSubtask(i) {
    taskData.subtasks.splice(i, 1);
    renderSubtasks();
}

/**
 * Save the edited subtask
 * @param {number} i - The index of the subtask
 */
function saveSubtask(i) {
    let subtask = document.getElementById("editedValue").value;
    let subtaskArray = { text: subtask, status: "unchecked" };
    taskData.subtasks[i] = subtaskArray;
    renderSubtasks();
}

/**
 * Check the key pressed for adding subtasks
 * @param {KeyboardEvent} ev - The keyboard event
 */
function checkKey(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtask();
    }
}

/**
 * Open the subtasks input
 */
function openSubtasks() {
    let imgContainer = document.getElementById("subtaskImgCont");
    document.getElementById("subtasksInput").focus();
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = returnSubtaskImg();
}

/**
 * Close the subtasks input
 * @param {Event} ev - The event object
 */
function closeSubtasks(ev) {
    ev.stopPropagation();
    document.getElementById("subtaskInputCont").style.borderColor = "";
    document.getElementById("requiredSubtext").style.display = "none";
    let imgContainer = document.getElementById("subtaskImgCont");
    imgContainer.innerHTML = `
    <div class="img-cont-subtask">
        <img src="../assets/icons/add.png" alt="">
    </div>
    `;
}

/**
 * Clear the input field for subtasks
 */
function clearInputfield() {
    document.getElementById("subtasksInput").value = "";
    hideWarning();
}

/**
 * Clear all input fields and data
 */
function clearAll() {
    clearAllInputs();
    checkedContacts = [];
    clearTaskDataArray();
    renderSignList();
    changeUrgency("mid");
    renderSubtasks();
}

/**
 * Clear all input fields
 */
function clearAllInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("categoryInput").value = "Select task category";
}

/**
 * Get the assigned contacts
 * @param {Object[]} contacts - List of contacts
 */
async function getAssignedContacts(contacts) {
    if (checkedContacts.length > 0) {
        for (let i = 0; i < checkedContacts.length; i++) {
            const assignedContact = checkedContacts[i];
            if (assignedContact) {
                taskData.assigned_to.push(contacts[i]);
            }
        }
    } else {
        taskData.assigned_to = "";
    }
}

/**
 * Get the urgency level of the task
 */
function getUrgency() {
    for (let i = 0; i < activeUrg.length; i++) {
        const urg = activeUrg[i];
        if (urg.active) {
            taskData.priority = urg.urgency;
        }
    }
}

/**
 * Show successful addition feedback
 */
function succesfullAdded() {
    document.getElementById("succesImgCnt").style.display = "flex";
    void document.getElementById("succesImg").offsetWidth;
    document.getElementById("succesImg").style.transform = "translateY(0px)";
}

/**
 * Close successful addition feedback
 */
function succesfullAddedClose() {
    document.getElementById("succesImgCnt").style.display = "none";
    void document.getElementById("succesImg").offsetWidth;
    document.getElementById("succesImg").style.transform = "translateY(500px)";
}

/**
 * Add a new task
 */
async function addNewTask() {
    document.getElementById("createButton").onclick = "";
    document.getElementById("createButton").disabled = true;
    saveInputValues();
}

/**
 * Save input values to task data
 */
async function saveInputValues() {
    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let due_date = document.getElementById("taskDate").value;
    let category = document.getElementById("categoryInput").value;
    if (title.length >= 1 && due_date.length >= 1 && category.length >= 1) {
        formValidationFeedbackOff();
        await postNewTask(title, due_date, description, category);
    } else {
        formValidationFeedbackOn();
    }
}

/**
 * Post a new task
 * @param {string} title - The title of the task
 * @param {string} due_date - The due date of the task
 * @param {string} description - The description of the task
 * @param {string} category - The category of the task
 */
async function postNewTask(title, due_date, description, category) {
    await postingTask(title, due_date, description, category);
    succesfullAdded();
    setTimeout(() => {
        getLocationAndMove();
    }, 1500);
}

/**
 * Post task data to the server
 * @param {string} title - The title of the task
 * @param {string} due_date - The due date of the task
 * @param {string} description - The description of the task
 * @param {string} category - The category of the task
 */
async function postingTask(title, due_date, description, category) {
    await setTaskData(title, due_date, description, category);
    await postData(TASKS_URL, taskData);
    clearAll();
}

/**
 * Set task data
 * @param {string} title - The title of the task
 * @param {string} due_date - The due date of the task
 * @param {string} description - The description of the task
 * @param {string} category - The category of the task
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
}

/**
 * Get the current location and move to the appropriate page
 */
function getLocationAndMove() {
    let location = window.location;
    if (location.pathname == "/html/board.html") {
        closeNewTaskInBoard();
        succesfullAddedClose();
        initBoard();
    } else if (location.pathname == "/html/addtask.html") {
        window.location = "../html/board.html";
    }
}
