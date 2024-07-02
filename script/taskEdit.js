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
    await setInputValuesEdit();
    if (taskDataEdit.title.length >= 1 && taskDataEdit.due_date.length >= 1 && taskDataEdit.category.length >= 1) {
        formValidationFeedbackOffEdit();
        if (taskDataEdit.assigned_to.length == 0) {
            taskDataEdit.assigned_to = "";
        }
        await putDataObject(TASKS_URL, taskDataEdit, taskId);

    } else {
        formValidationFeedbackOnEdit();
    }
    controlContacts = [];
    initBoard();
    taskContainer.innerHTML = renderTask(taskDataEdit.id);
};

async function initDataEditTask(task, id) {
    taskDataEdit = task;
    taskId = id;
    let contacts = await loadData(CONTACTS_URL);
    let assignedContacts = task.assigned_to;
    changeUrgencyEdit(task.priority);
    settingControlContacts(contacts, assignedContacts);
    renderSignListEdit();
    renderSubtasksEdit();
};

async function setInputValuesEdit() {
    await getAssignedContactsEdit();
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

function checkKeyEdit(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        addSubtaskEdit();
    }
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


function checkAssignmentsEdit(i) {
    if (controlContacts[i] === true) {
        displayAssignmentsEdit("checked", i)
    } else if (controlContacts[i] === false) {
        displayAssignmentsEdit("unchecked", i)
    }
};

async function assignContactEdit(i) {
    let trueContacts = controlContacts.filter(controlContact => controlContact === true);
    if (trueContacts.length < 12) {
        if (controlContacts[i] === true) {
            controlContacts[i] = false;
        } else if (controlContacts[i] === false) {
            controlContacts[i] = true;
        }
    renderSignListEdit();
    checkAssignmentsEdit(i);
    } else {
        showMaxContactsEdit();
    }
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

function hoverBtnEdit(boolean, id) {
    if (boolean === true && id === "img-highEdit") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-white.png";
    } else if (boolean === false && id === "img-highEdit" && activeUrgEdit[0].active === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-color.png";
    }
    if (boolean === true && id === "img-midEdit") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && id === "img-midEdit" && activeUrgEdit[1].active === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-color.png";
    }
    if (boolean === true && id === "img-lowEdit") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && id === "img-lowEdit" && activeUrgEdit[2].active === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-color.png";
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