let controlContacts = [];
let taskDataEdit = {};
let taskId = "";
let activeUrgEdit = [
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

async function putEditTask() {
    setInputValuesEdit();
    console.log(taskDataEdit);
    if (taskDataEdit.title.length >= 1 && taskDataEdit.due_date.length >= 1 && taskDataEdit.category.length >= 1) {
        formValidationFeedbackOffEdit();
        await putDataObject(TASKS_URL, taskDataEdit, taskId);
        taskContainer.innerHTML = renderTask(taskId);
    } else {
        formValidationFeedbackOnEdit();
    }
};

async function initDataEditTask(task, id) {
    taskDataEdit = task;
    taskId = id
    if (taskDataEdit.assigned_to === "") {
        taskDataEdit.assigned_to = [];
    }
    changeUrgencyEdit(task.priority);
    renderSubtasksEdit();
    let contacts = await loadData(CONTACTS_URL);
    let assignedContacts = task.assigned_to;
    settingControlContacts(contacts, assignedContacts);
    renderSignListEdit();
};

async function setInputValuesEdit() {
    getAssignedContactsEdit();
    getUrgencyEdit();
    taskDataEdit.title = document.getElementById("taskTitleEdit").value;
    taskDataEdit.description = document.getElementById("taskDescriptionEdit").value;
    taskDataEdit.due_date = document.getElementById("taskDateEdit").value;
    taskDataEdit.category = document.getElementById("categoryInputEdit").value;
};

async function getAssignedContactsEdit() {
    let contacts = await loadData(CONTACTS_URL);
    taskDataEdit.assigned_to = [];
    if (contacts.length > 0) {
        for (let i = 0; i < controlContacts.length; i++) {
            const assignedContact = controlContacts[i];
            if (assignedContact === true) {
                taskDataEdit.assigned_to.push(contacts[i]);
            }
        }
    }
};

function getUrgencyEdit() {
    for (let i = 0; i < activeUrgEdit.length; i++) {
        const urg = activeUrgEdit[i];
        if (urg.active === true) {
            taskDataEdit.priority = urg.urgency;
        }
    }
};

function handleClickEventEdit(event) {
    closeContactsEdit(event);
    closeCategorysEdit(event);
    closeSubtasksEdit(event);
    formValidationFeedbackOffEdit();
};

function settingControlContacts(contacts, assignedContacts) {
    if (assignedContacts.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            let isAssigned = false;
            for (let j = 0; j < assignedContacts.length; j++) {
                const assignedContact = assignedContacts[j];
                if (contact.id === assignedContact.id) {
                    isAssigned = true;
                }
            }
            controlContacts.push(isAssigned);
        }
    } else if (assignedContacts.length === 0) {
        for (let i = 0; i < contacts.length; i++) {
            controlContacts.push(false);
        }
    }
};

function openCalenderEdit() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("taskDateEdit").setAttribute('min', today);
    document.getElementById("taskDateEdit").showPicker();
    document.getElementById("taskDateEdit").style.color = "black";
};

async function openContactsEdit() {
    if (contactsTaskOpen === false) {
        displayContactsEdit("open")
        renderContactListEdit();
        contactsTaskOpen = true;
    }
};

function closeContactsEdit(event) {
    if (contactsTaskOpen === true) {
        event.stopPropagation();
        displayContactsEdit("close");
        contactsTaskOpen = false;
    }
};

async function renderContactListEdit() {
    let content = document.getElementById("dropdownMenuEdit");
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    content.innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += returnContactListEdit(contact, i)
        checkAssignmentsEdit(i);
    }
};

function returnContactListEdit(cnt, i) {
    return `
        <div onclick="assignContactEdit(${i})" class="dropdown-item" id="cntnumEdit${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsignEdit${i}" style="background-color: ${cnt.color};">${getInitials(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimgEdit${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
};

function checkAssignmentsEdit(i) {
    if (controlContacts[i] === true) {
        displayAssignmentsEdit("checked", i)
    } else if (controlContacts[i] === false) {
        displayAssignmentsEdit("unchecked", i)
    }
};

async function assignContactEdit(i) {
    if (controlContacts[i] === true) {
        controlContacts[i] = false;
    } else if (controlContacts[i] === false) {
        controlContacts[i] = true;
    }
    renderSignListEdit();
    checkAssignmentsEdit(i);
};

async function renderSignListEdit() {
    if (controlContacts.includes(true)) {
        let content = document.getElementById("signContainerEdit");
        controlCheckedLengthEdit();
        content.innerHTML = "";
        let contacts = await loadData(CONTACTS_URL);
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            if (controlContacts[i] === true) {
                content.innerHTML += returnSignListEdit(contact, i)
            }
        }
    }
};

function controlCheckedLengthEdit() {
    let container = document.getElementById("signContainerEdit");
    let trueCount = controlContacts.filter(value => value === true).length;
    if (trueCount >= 1) {
        container.style.display = "";
    } else if (trueCount < 1) {
        container.style.display = "none";
    }
};

function displayContactsEdit(ev) {
    if (ev === "open") {
        document.getElementById("dropdownToggleEdit").style.display = "none";
        document.getElementById("dropdownMenuContainerEdit").style.display = "";
        document.getElementById("dropdownMenuEdit").style.display = "block";
    } else if (ev === "close") {
        document.getElementById("dropdownToggleEdit").style.display = "flex";
        document.getElementById("dropdownMenuContainerEdit").style.display = "none";
        document.getElementById("dropdownMenuEdit").style.display = "none";
    }
};

function displayAssignmentsEdit(check, i) {
    if (check === "checked") {
        document.getElementById(`cntimgEdit${i}`).src = "../assets/icons/rb-checked.png";
        document.getElementById(`cntnumEdit${i}`).classList.add("bg-darkblue");
        document.getElementById(`cntnumEdit${i}`).classList.add("task-hover-dark");
        document.getElementById(`cntnumEdit${i}`).classList.add("color-white");
    } else if (check === "unchecked") {
        document.getElementById(`cntimgEdit${i}`).src = "../assets/icons/rb-unchecked.png";
        document.getElementById(`cntnumEdit${i}`).classList.remove("bg-darkblue");
        document.getElementById(`cntnumEdit${i}`).classList.remove("color-white");
        document.getElementById(`cntnumEdit${i}`).classList.remove("task-hover-dark");
    }
};

function returnSignListEdit(cnt, i) {
    return `
           <div class="task-cnt-assigned-sign">
                <div class="task-cnt-sign flex-center" id="contactsignEdit${i}" style='background-color:${cnt.color}'>
                ${getInitials(cnt.name)}
                </div>
           </div>`;
};

function changeUrgencyEdit(urg) {
    if (urg === "high") {
        activeUrgEdit[0].active = true;
        activeUrgEdit[1].active = false;
        activeUrgEdit[2].active = false;
    } else if (urg === "mid") {
        activeUrgEdit[0].active = false;
        activeUrgEdit[1].active = true;
        activeUrgEdit[2].active = false;
    } else if (urg === "low") {
        activeUrgEdit[0].active = false;
        activeUrgEdit[1].active = false;
        activeUrgEdit[2].active = true;
    }
    changeBgBtnEdit()
};

function changeBgBtnEdit() {
    if (activeUrgEdit[0].active === true) {
        highlightButtonEdit("high");
    }
    if (activeUrgEdit[1].active === true) {
        highlightButtonEdit("mid");
    }
    if (activeUrgEdit[2].active === true) {
        highlightButtonEdit("low");
    }
};

function highlightButtonEdit(urg) {
    if (urg === "high") {
        document.getElementById("high").classList.add("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-white.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "mid") {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.add("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-white.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "low") {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.add("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-white.png`;
    }
};

function hoverBtnEdit(boolean, id) {
    let newId = id + "Edit";
    if (boolean === true && newId === "img-highEdit") {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-high-white.png";
    } else if (boolean === false && newId === "img-highEdit" && activeUrgEdit[0].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-high-color.png";
    }
    if (boolean === true && newId === "img-midEdit") {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && newId === "img-midEdit" && activeUrgEdit[1].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-mid-color.png";
    }
    if (boolean === true && newId === "img-lowEdit") {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && newId === "img-lowEdit" && activeUrgEdit[2].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-low-color.png";
    }
};

function openCategorysEdit() {
    document.getElementById("dropdownCategoryToggleEdit").style.display = "none";
    document.getElementById("dropdownCategoryContainerEdit").style.display = "";
    document.getElementById("dropdownCategorysEdit").style.display = "flex";
    renderTaskListEdit();
};

function closeCategorysEdit(ev) {
    ev.stopPropagation();
    document.getElementById("dropdownCategoryToggleEdit").style.display = "";
    document.getElementById("dropdownCategoryContainerEdit").style.display = "none";
    document.getElementById("dropdownCategorysEdit").style.display = "none";
};

function renderTaskListEdit() {
    let content = document.getElementById("dropdownCategorysEdit");
    content.innerHTML = "";
    for (let i = 0; i < availableCategorys.length; i++) {
        const category = availableCategorys[i];
        content.innerHTML += returnTaskListHTMLEdit(category, i);
    }
};

function returnTaskListHTMLEdit(category, i) {
    return `
        <div onclick="addCategoryEdit(${i}); closeCategorysEdit(event);" class="category-dd-item task-form-font" id="ctg${i}">
            <div class="task-cnt-name">${category}</div>
        </div>
        `;
};

function addCategoryEdit(i) {
    if (taskDataEdit.category === "") {
        taskDataEdit.category = availableCategorys[i];
    } else {
        taskDataEdit.category = "";
        taskDataEdit.category = availableCategorys[i];
    }
    document.getElementById("categoryInputEdit").value = `${taskDataEdit.category}`
};

function openSubtasksEdit() {
    let imgContainer = document.getElementById("subtaskImgContEdit");
    document.getElementById("subtasksInputEdit").focus();
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = returnSubtaskImgEdit()
};

function closeSubtasksEdit(ev) {
    ev.stopPropagation();
    document.getElementById("subtaskInputContEdit").style.borderColor = "";
    document.getElementById("requiredSubtextEdit").style.display = "none";
    let imgContainer = document.getElementById("subtaskImgContEdit");
    imgContainer.innerHTML = "";
    imgContainer.innerHTML = `
    <div class="img-cont-subtask">
        <img src="../assets/icons/add.png" alt="">
    </div>
    `;
};

function returnSubtaskImgEdit() {
    return `
    <div onclick="clearInputfieldEdit()" class=" img-cont-subtask-first-n img-cont-subtask">
        <img src="../assets/icons/x-black.png" alt="">
    </div>
    <div onclick="addSubtaskEdit()" class="img-cont-subtask">
        <img src="../assets/icons/hook-small-dark.png" alt="">
    </div>
    `;
};

function addSubtaskEdit() {
    let input = document.getElementById("subtasksInputEdit").value;
    if (taskDataEdit.subtasks === "") {
        taskDataEdit.subtasks = [];
    }
    if (input !== "" && taskDataEdit.subtasks.length < 4) {
        let subtaskArray = { text: `${input}`, status: "unchecked" }
        taskDataEdit.subtasks.push(subtaskArray);
        hideWarningEdit();
        renderSubtasksEdit();
    } else {
        showWarningEdit();
    }
    if (taskDataEdit.subtasks.length === 4) {
        document.getElementById("requiredSubtextEdit").style.display = "block";
        document.getElementById("requiredSubtextEdit").innerHTML = "You reached the maximum number of tasks"
    }
};

function renderSubtasksEdit() {
    container = document.getElementById("addedSubtasksEdit")
    container.innerHTML = "";
    for (let i = 0; i < taskDataEdit.subtasks.length; i++) {
        const subtask = taskDataEdit.subtasks[i];
        container.innerHTML += returnSubtasksListEdit(subtask, i);
    }
};

function hideWarningEdit() {
    document.getElementById("subtasksInputEdit").value = "";
    document.getElementById("subtaskInputContEdit").style.borderColor = "";
    document.getElementById("requiredSubtextEdit").style.display = "none";
};

function showWarningEdit() {
    document.getElementById("subtaskInputContEdit").style.borderColor = "red";
    document.getElementById("requiredSubtextEdit").style.display = "block";
    document.getElementById("subtasksInputEdit").focus();
};

function editSubtaskEdit(i) {
    document.getElementById(`subtaskEdit${i}`).innerHTML = returnEditSubtaskHTMLEdit(i);
    document.getElementById("editedValueEdit").focus()
    document.getElementById("editedValueEdit").select()
};

function checkEditKeyEdit(ev, i) {
    if (ev.key === "Enter") {
        ev.preventDefault();
        saveSubtaskEdit(i);
    }
};

function saveSubtaskEdit(i) {
    let subtask = document.getElementById("editedValueEdit").value
    let subtaskArray = { text: subtask, status: "unchecked" };
    taskDataEdit.subtasks[i] = subtaskArray;
    renderSubtasksEdit();
};

function clearInputfieldEdit() {
    document.getElementById("subtasksInputEdit").value = "";
    hideWarningEdit();
};

function deleteSubtaskEdit(i) {
    taskDataEdit.subtasks.splice(i, 1);
    renderSubtasksEdit();
};

function formValidationFeedbackOnEdit() {
    document.getElementById("taskTitleEdit").style.borderColor = "red";
    document.getElementById("requiredTitleEdit").style.display = "";
    document.getElementById("taskDateEdit").style.borderColor = "red";
    document.getElementById("requiredDateEdit").style.display = "";
    document.getElementById("dropdownCategoryToggleEdit").style.borderColor = "red";
    document.getElementById("requiredCategorysEdit").style.display = "";
};

function formValidationFeedbackOffEdit() {
    document.getElementById("taskTitleEdit").style.borderColor = "";
    document.getElementById("requiredTitleEdit").style.display = "none";
    document.getElementById("taskDateEdit").style.borderColor = "";
    document.getElementById("requiredDateEdit").style.display = "none";
    document.getElementById("dropdownCategoryToggleEdit").style.borderColor = "";
    document.getElementById("requiredCategorysEdit").style.display = "none";
};

function returnSubtasksListEdit(subtask, i) {
    return `
        <div id="subtaskEdit${i}">
            <div class="subtask-item">
                <li>${subtask.text}</li>
                <div class="img-cont-subtask flex-center">
                    <div onclick="editSubtaskEdit(${i})" class="img-cont-subtask-first img-cont-subtask">
                        <img src="../assets/icons/edit.png" alt="">
                    </div>
                    <div onclick="deleteSubtaskEdit(${i})" class="img-cont-subtask-last">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>
                </div>
            </div>
        </div>
       `;
};

function returnEditSubtaskHTMLEdit(i) {
    return `
            <div onkeydown="checkEditKeyEdit(event, ${i})" class="edit-subtask-item">
                <input id="editedValueEdit" type="text" class="editable-input" value="${taskDataEdit.subtasks[i].text}">
                <div class="img-cont-subtask flex-center">
                    <div onclick="deleteSubtaskEdit(${i})" class="img-cont-subtask-first img-cont-subtask">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>
                    <div onclick="saveSubtaskEdit(${i})" class="img-cont-subtask-last">
                        <img src="../assets/icons/hook-small-dark.png" alt="">
                    </div>
                </div>
            </div>
    `;
};