/**
 * Array to control assigned contacts for editing task
 * @type {boolean[]}
 */
let controlContacts = [];

/**
 * Object to hold task data for editing
 * @type {Object}
 */
let taskDataEdit = {};

/**
 * ID of the task being edited
 * @type {string}
 */
let taskId = "";

/**
 * Array to manage active urgency levels for editing task
 * @type {Object[]}
 */
let activeUrgEdit = [
    { urgency: "high", active: false },
    { urgency: "mid", active: false },
    { urgency: "low", active: false }
];

/**
 * Updates the edited task data on the server
 * @async
 */
async function putEditTask() {
    await setInputValuesEdit();

    if (taskDataEdit.title.length >= 1 && taskDataEdit.due_date.length >= 1 && taskDataEdit.category.length >= 1) {
        formValidationFeedbackOffEdit();
        if (taskDataEdit.assigned_to.length === 0) {
            taskDataEdit.assigned_to = "";
        }
        await putDataObject(TASKS_URL, taskDataEdit, taskId);
    } else {
        formValidationFeedbackOnEdit();
    }

    controlContacts = [];
    initBoard();
    taskContainer.innerHTML = renderTask(taskDataEdit.id);
}

/**
 * Initializes task data for editing
 * @async
 * @param {Object} task - Task data to be edited
 * @param {string} id - ID of the task being edited
 */
async function initDataEditTask(task, id) {
    taskDataEdit = task;
    taskId = id;
    let contacts = await loadData(CONTACTS_URL);
    let assignedContacts = task.assigned_to;
    changeUrgencyEdit(task.priority);
    settingControlContacts(contacts, assignedContacts);
    renderSignListEdit();
    renderSubtasksEdit();
}

/**
 * Sets input values to the edited task data
 * @async
 */
async function setInputValuesEdit() {
    await getAssignedContactsEdit();
    getUrgencyEdit();
    taskDataEdit.title = document.getElementById("taskTitleEdit").value;
    taskDataEdit.description = document.getElementById("taskDescriptionEdit").value;
    taskDataEdit.due_date = document.getElementById("taskDateEdit").value;
    taskDataEdit.category = document.getElementById("categoryInputEdit").value;
}

/**
 * Retrieves assigned contacts for editing task
 * @async
 */
async function getAssignedContactsEdit() {
    let contacts = await loadData(CONTACTS_URL);
    taskDataEdit.assigned_to = [];
    if (contacts.length > 0) {
        for (let i = 0; i < controlContacts.length; i++) {
            if (controlContacts[i] === true) {
                taskDataEdit.assigned_to.push(contacts[i]);
            }
        }
    }
}

/**
 * Retrieves urgency level for editing task
 */
function getUrgencyEdit() {
    for (let i = 0; i < activeUrgEdit.length; i++) {
        if (activeUrgEdit[i].active === true) {
            taskDataEdit.priority = activeUrgEdit[i].urgency;
        }
    }
}

/**
 * Handles click events during editing process
 * @param {Event} event - Click event object
 */
function handleClickEventEdit(event) {
    closeContactsEdit(event);
    closeCategorysEdit(event);
    closeSubtasksEdit(event);
    formValidationFeedbackOffEdit();
}

/**
 * Checks if Enter key is pressed during editing subtasks
 * @param {KeyboardEvent} ev - Keyboard event object
 */
function checkKeyEdit(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtaskEdit();
    }
}

/**
 * Sets controlContacts array based on assigned contacts for editing
 * @param {Object[]} contacts - Array of contacts
 * @param {Object[]} assignedContacts - Array of assigned contacts for the task being edited
 */
function settingControlContacts(contacts, assignedContacts) {
    if (assignedContacts.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
            let isAssigned = false;
            for (let j = 0; j < assignedContacts.length; j++) {
                if (contacts[i].id === assignedContacts[j].id) {
                    isAssigned = true;
                    break;
                }
            }
            controlContacts.push(isAssigned);
        }
    } else {
        for (let i = 0; i < contacts.length; i++) {
            controlContacts.push(false);
        }
    }
}

/**
 * Opens calendar for editing due date
 */
function openCalenderEdit() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("taskDateEdit").setAttribute('min', today);
    document.getElementById("taskDateEdit").showPicker();
    document.getElementById("taskDateEdit").style.color = "black";
}

/**
 * Opens contacts list for editing task assignment
 */
async function openContactsEdit() {
    if (!contactsTaskOpen) {
        displayContactsEdit("open");
        renderContactListEdit();
        contactsTaskOpen = true;
    }
}

/**
 * Closes contacts list during editing task assignment
 * @param {Event} event - Click event object
 */
function closeContactsEdit(event) {
    if (contactsTaskOpen) {
        event.stopPropagation();
        displayContactsEdit("close");
        contactsTaskOpen = false;
    }
}

/**
 * Renders list of contacts for editing task assignment
 * @async
 */
async function renderContactListEdit() {
    let content = document.getElementById("dropdownMenuEdit");
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    for (let i = 0; i < contacts.length; i++) {
        content.innerHTML += returnContactListEdit(contacts[i], i);
        checkAssignmentsEdit(i);
    }
}

/**
 * Checks and displays assigned status of each contact during editing
 * @param {number} i - Index of the contact
 */
function checkAssignmentsEdit(i) {
    if (controlContacts[i] === true) {
        displayAssignmentsEdit("checked", i);
    } else {
        displayAssignmentsEdit("unchecked", i);
    }
}

/**
 * Toggles assignment of a contact during editing
 * @async
 * @param {number} i - Index of the contact
 */
async function assignContactEdit(i) {
    let trueContacts = controlContacts.filter(contact => contact === true);
    if (trueContacts.length < 12) {
        controlContacts[i] = !controlContacts[i];
        renderSignListEdit();
        checkAssignmentsEdit(i);
    } else {
        showMaxContactsEdit();
    }
}

/**
 * Renders the list of assigned contacts during editing
 * @async
 */
async function renderSignListEdit() {
    let content = document.getElementById("signContainerEdit");
    if (controlContacts.includes(true)) {
        controlCheckedLengthEdit();
        content.innerHTML = "";
        let contacts = await loadData(CONTACTS_URL);
        for (let i = 0; i < contacts.length; i++) {
            if (controlContacts[i] === true) {
                content.innerHTML += returnSignListEdit(contacts[i], i);
            }
        }
    }
}

/**
 * Controls visibility of assigned contacts section during editing
 */
function controlCheckedLengthEdit() {
    let container = document.getElementById("signContainerEdit");
    let trueCount = controlContacts.filter(value => value === true).length;
    container.style.display = (trueCount >= 1) ? "" : "none";
}

/**
 * Displays contacts list for editing
 * @param {string} ev - Event type ('open' or 'close')
 */
function displayContactsEdit(ev) {
    let dropdownToggleEdit = document.getElementById("dropdownToggleEdit");
    let dropdownMenuContainerEdit = document.getElementById("dropdownMenuContainerEdit");
    let dropdownMenuEdit = document.getElementById("dropdownMenuEdit");

    if (ev === "open") {
        dropdownToggleEdit.style.display = "none";
        dropdownMenuContainerEdit.style.display = "";
        dropdownMenuEdit.style.display = "block";
    } else if (ev === "close") {
        dropdownToggleEdit.style.display = "flex";
        dropdownMenuContainerEdit.style.display = "none";
        dropdownMenuEdit.style.display = "none";
    }
}

/**
 * Displays assigned status of a contact during editing
 * @param {string} check - Check status ('checked' or 'unchecked')
 * @param {number} i - Index of the contact
 */
function displayAssignmentsEdit(check, i) {
    let imgEdit = document.getElementById(`cntimgEdit${i}`);
    let numEdit = document.getElementById(`cntnumEdit${i}`);

    if (check === "checked") {
        imgEdit.src = "../assets/icons/rb-checked.png";
        numEdit.classList.add("bg-darkblue", "task-hover-dark", "color-white");
    } else if (check === "unchecked") {
        imgEdit.src = "../assets/icons/rb-unchecked.png";
        numEdit.classList.remove("bg-darkblue", "color-white", "task-hover-dark");
    }
}

/**
 * Returns HTML for displaying assigned contact during editing
 * @param {Object} cnt - Contact object
 * @param {number} i - Index of the contact
 * @returns {string} - HTML string
 */
function returnSignListEdit(cnt, i) {
    return `
        <div class="task-cnt-assigned-sign">
            <div class="task-cnt-sign flex-center" id="contactsignEdit${i}" style='background-color:${cnt.color}'>
                ${getInitials(cnt.name)}
            </div>
        </div>`;
}

/**
 * Changes the urgency level for editing task
 * @param {string} urg - Urgency level ('high', 'mid', 'low')
 */
function changeUrgencyEdit(urg) {
    switch (urg) {
        case "high":
            setActiveUrgencyEdit(true, false, false);
            break;
        case "mid":
            setActiveUrgencyEdit(false, true, false);
            break;
        case "low":
            setActiveUrgencyEdit(false, false, true);
            break;
    }
    changeBgBtnEdit();
}

/**
 * Sets active state of urgency levels during editing task
 * @param {boolean} high - Active state of high urgency
 * @param {boolean} mid - Active state of mid urgency
 * @param {boolean} low - Active state of low urgency
 */
function setActiveUrgencyEdit(high, mid, low) {
    activeUrgEdit[0].active = high;
    activeUrgEdit[1].active = mid;
    activeUrgEdit[2].active = low;
}

/**
 * Changes background of urgency buttons during editing task
 */
function changeBgBtnEdit() {
    activeUrgEdit.forEach((urg) => {
        let imgId = `img-${urg.urgency}Edit`;
        if (urg.active) {
            highlightButtonEdit(urg.urgency);
            hoverBtnEdit(true, imgId);
        } else {
            hoverBtnEdit(false, imgId);
        }
    });
}

/**
 * Handles hover effect on urgency buttons during editing task
 * @param {boolean} boolean - Hover state (true or false)
 * @param {string} id - ID of the urgency button image element
 */
function hoverBtnEdit(boolean, id) {
    let imgPath = boolean ? `../assets/icons-addtask/prio-${id.substring(4)}-white.png` : `../assets/icons-addtask/prio-${id.substring(4)}-color.png`;
    document.getElementById(id).src = imgPath;
}

/**
 * Opens category list for editing task
 */
function openCategorysEdit() {
    document.getElementById("dropdownCategoryToggleEdit").style.display = "none";
    document.getElementById("dropdownCategoryContainerEdit").style.display = "";
    document.getElementById("dropdownCategorysEdit").style.display = "flex";
    renderTaskListEdit();
}

/**
 * Closes category list during editing task
 * @param {Event} ev - Click event object
 */
function closeCategorysEdit(ev) {
    ev.stopPropagation();
    document.getElementById("dropdownCategoryToggleEdit").style.display = "";
    document.getElementById("dropdownCategoryContainerEdit").style.display = "none";
    document.getElementById("dropdownCategorysEdit").style.display = "none";
}

/**
 * Renders list of categories for editing task
 */
function renderTaskListEdit() {
    let content = document.getElementById("dropdownCategorysEdit");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        content.innerHTML += returnTaskListHTMLEdit(availableCategorys[i], i);
    }
}

/**
 * Returns HTML for displaying a category in the list during editing task
 * @param {string} category - Category name
 * @param {number} i - Index of the category
 * @returns {string} - HTML string
 */
function returnTaskListHTMLEdit(category, i) {
    return `
        <div onclick="addCategoryEdit(${i}); closeCategorysEdit(event);" class="category-dd-item task-form-font" id="ctg${i}">
            <div class="task-cnt-name">${category}</div>
        </div>`;
}

/**
 * Adds a category to the task being edited
 * @param {number} i - Index of the category
 */
function addCategoryEdit(i) {
    taskDataEdit.category = availableCategorys[i];
    document.getElementById("categoryInputEdit").value = taskDataEdit.category;
}

/**
 * Opens subtasks input field for editing task
 */
function openSubtasksEdit() {
    let imgContainer = document.getElementById("subtaskImgContEdit");
    document.getElementById("subtasksInputEdit").focus();
    imgContainer.innerHTML = returnSubtaskImgEdit();
}

/**
 * Closes subtasks input field during editing task
 * @param {Event} ev - Click event object
 */
function closeSubtasksEdit(ev) {
    ev.stopPropagation();
    document.getElementById("subtaskInputContEdit").style.borderColor = "";
    document.getElementById("requiredSubtextEdit").style.display = "none";
    let imgContainer = document.getElementById("subtaskImgContEdit");
    imgContainer.innerHTML = returnSubtaskImgEdit();
}

/**
 * Adds a subtask to the task being edited
 */
function addSubtaskEdit() {
    let input = document.getElementById("subtasksInputEdit").value;
    if (input !== "" && taskDataEdit.subtasks.length < 4) {
        taskDataEdit.subtasks.push({ text: input, status: "unchecked" });
        hideWarningEdit();
    } else {
        showWarningEdit();
    }
    if (taskDataEdit.subtasks.length === 4) {
        document.getElementById("requiredSubtextEdit").style.display = "block";
        document.getElementById("requiredSubtextEdit").innerHTML = "You reached the maximum number of tasks";
    }
    renderSubtasksEdit();
}

/**
 * Renders list of subtasks for editing task
 */
function renderSubtasksEdit() {
    let container = document.getElementById("addedSubtasksEdit");
    container.innerHTML = "";
    for (let i = 0; i < taskDataEdit.subtasks.length; i++) {
        container.innerHTML += returnSubtasksListEdit(taskDataEdit.subtasks[i], i);
    }
}

/**
 * Enables editing of a subtask for editing task
 * @param {number} i - Index of the subtask
 */
function editSubtaskEdit(i) {
    document.getElementById(`subtaskEdit${i}`).innerHTML = returnEditSubtaskHTMLEdit(i);
    document.getElementById("editedValueEdit").focus();
    document.getElementById("editedValueEdit").select();
}

/**
 * Checks if Enter key is pressed during editing a subtask
 * @param {KeyboardEvent} ev - Keyboard event object
 * @param {number} i - Index of the subtask
 */
function checkEditKeyEdit(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtaskEdit(i);
    }
}

/**
 * Saves edited subtask for editing task
 * @param {number} i - Index of the subtask
 */
function saveSubtaskEdit(i) {
    let subtask = document.getElementById("editedValueEdit").value;
    taskDataEdit.subtasks[i].text = subtask;
    renderSubtasksEdit();
}

/**
 * Clears input field for subtasks during editing task
 */
function clearInputfieldEdit() {
    document.getElementById("subtasksInputEdit").value = "";
    hideWarningEdit();
}

/**
 * Deletes a subtask from the task being edited
 * @param {number} i - Index of the subtask
 */
function deleteSubtaskEdit(i) {
    taskDataEdit.subtasks.splice(i, 1);
    renderSubtasksEdit();
}
