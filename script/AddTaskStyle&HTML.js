/**
 * Change background button based on urgency
 */
function changeBgBtn() {
    if (activeUrg[0].active === true) {
        highlightButton("high");
    }
    if (activeUrg[1].active === true) {
        highlightButton("mid");
    }
    if (activeUrg[2].active === true) {
        highlightButton("low");
    }
}

/**
 * Highlight the button based on urgency
 * @param {string} urg - The urgency level ("high", "mid", "low")
 */
function highlightButton(urg) {
    if (urg === "high") {
        document.getElementById("high").classList.add("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-white.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "mid") {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.add("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-white.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "low") {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.add("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-white.png`;
    }
}

/**
 * Show the maximum contacts
 */
function showMaxContacts() {
    document.getElementById("maxContacts").style.display = "";
    displayContacts("close");
}

/**
 * Hide the maximum contacts
 */
function hideMaxContacts() {
    document.getElementById("maxContacts").style.display = "none";
}

/**
 * Hide the warning for subtasks
 */
function hideWarning() {
    document.getElementById("subtasksInput").value = "";
    document.getElementById("subtaskInputCont").style.borderColor = "";
    document.getElementById("requiredSubtext").innerHTML = "Cannot set empty subtask";
    document.getElementById("requiredSubtext").style.display = "none";
}

/**
 * Show the warning for subtasks
 */
function showWarning() {
    document.getElementById("subtaskInputCont").style.borderColor = "red";
    document.getElementById("requiredSubtext").style.display = "block";
    document.getElementById("subtasksInput").focus();
}

/**
 * Handle hover effect on priority buttons
 * @param {boolean} boolean - The hover state (true for hover, false for out)
 * @param {string} id - The id of the image element
 */
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
}

/**
 * Change the icon color on mouse enter
 */
function enterIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-blue.png";
}

/**
 * Change the icon color on mouse leave
 */
function outIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-black.png";
}

/**
 * Open the category dropdown
 */
function openCategorys() {
    document.getElementById("dropdownCategoryToggle").style.display = "none";
    document.getElementById("dropdownCategoryContainer").style.display = "";
    document.getElementById("dropdownCategorys").style.display = "flex";
    renderTaskList();
}

/**
 * Close the category dropdown
 * @param {Event} ev - The event object
 */
function closeCategorys(ev) {
    ev.stopPropagation();
    document.getElementById("dropdownCategoryToggle").style.display = "";
    document.getElementById("dropdownCategoryContainer").style.display = "none";
    document.getElementById("dropdownCategorys").style.display = "none";
}

/**
 * Open the calendar and set the minimum date to today
 */
function openCalender() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("taskDate").setAttribute('min', today);
    document.getElementById("taskDate").showPicker();
    document.getElementById("taskDate").style.color = "black";
}

/**
 * Return the HTML for a task list item
 * @param {string} category - The category of the task
 * @param {number} i - The index of the task
 * @returns {string} - The HTML string for the task list item
 */
function returnTaskListHTML(category, i) {
    return `
        <div onclick="addCategory(${i}); closeCategorys(event);" class="category-dd-item" id="ctg${i}">
            <div class="task-cnt-name">${category}</div>
        </div>
        `;
}

/**
 * Display the contacts dropdown
 * @param {string} ev - The event type ("open" or "close")
 */
function displayContacts(ev) {
    if (ev === "open") {
        document.getElementById("dropdownToggle").style.display = "none";
        document.getElementById("dropdownMenuContainer").style.display = "";
        document.getElementById("dropdownMenu").style.display = "block";
    } else if (ev === "close") {
        document.getElementById("dropdownToggle").style.display = "flex";
        document.getElementById("dropdownMenuContainer").style.display = "none";
        document.getElementById("dropdownMenu").style.display = "none";
    }
}

/**
 * Return the HTML for a contact list item
 * @param {Object} cnt - The contact object
 * @param {number} i - The index of the contact
 * @returns {string} - The HTML string for the contact list item
 */
function returnContactList(cnt, i) {
    return `
        <div onclick="assignContact(${i})" class="dropdown-item" id="cntnum${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsign${i}" style="background-color: ${cnt.color};">${getInitials(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimg${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
}

/**
 * Display the assignment status for a contact
 * @param {string} check - The check status ("checked" or "unchecked")
 * @param {number} i - The index of the contact
 */
function displayAssignments(check, i) {
    if (check === "checked") {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-checked.png";
        document.getElementById(`cntnum${i}`).classList.add("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.add("task-hover-dark");
        document.getElementById(`cntnum${i}`).classList.add("color-white");
    } else if (check === "unchecked") {
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-unchecked.png";
        document.getElementById(`cntnum${i}`).classList.remove("bg-darkblue");
        document.getElementById(`cntnum${i}`).classList.remove("color-white");
        document.getElementById(`cntnum${i}`).classList.remove("task-hover-dark");
    }
}

/**
 * Return the HTML for a contact sign list item
 * @param {Object} cnt - The contact object
 * @param {number} i - The index of the contact
 * @returns {string} - The HTML string for the contact sign list item
 */
function returnSignList(cnt, i) {
    return `
           <div class="task-cnt-assigned-sign">
                <div class="task-cnt-sign flex-center" id="contactsign${i}" style='background-color:${cnt.color}'>
                ${getInitials(cnt.name)}
                </div>
           </div>`;
}

/**
 * Return the HTML for a subtask list item
 * @param {Object} subtask - The subtask object
 * @param {number} i - The index of the subtask
 * @returns {string} - The HTML string for the subtask list item
 */
function returnSubtasksList(subtask, i) {
    return `
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

/**
 * Return the HTML for an editable subtask item
 * @param {number} i - The index of the subtask
 * @returns {string} - The HTML string for the editable subtask item
 */
function returnEditSubtaskHTML(i) {
    return `
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
}

/**
 * Return the HTML for the subtask image container
 * @returns {string} - The HTML string for the subtask image container
 */
function returnSubtaskImg() {
    return `
    <div onclick="clearInputfield()" class=" img-cont-subtask-first-n img-cont-subtask">
        <img src="../assets/icons/x-black.png" alt="">
    </div>
    <div onclick="addSubtask()" class="img-cont-subtask">
        <img src="../assets/icons/hook-small-dark.png" alt="">
    </div>
    `;
}

/**
 * Show validation feedback on the form
 */
function formValidationFeedbackOn() {
    document.getElementById("taskTitle").style.borderColor = "red";
    document.getElementById("requiredTitle").style.display = "";
    document.getElementById("taskDate").style.borderColor = "red";
    document.getElementById("requiredDate").style.display = "";
    document.getElementById("dropdownCategoryToggle").style.borderColor = "red";
    document.getElementById("requiredCategorys").style.display = "";
}

/**
 * Hide validation feedback on the form
 */
function formValidationFeedbackOff() {
    document.getElementById("taskTitle").style.borderColor = "";
    document.getElementById("requiredTitle").style.display = "none";
    document.getElementById("taskDate").style.borderColor = "";
    document.getElementById("requiredDate").style.display = "none";
    document.getElementById("dropdownCategoryToggle").style.borderColor = "";
    document.getElementById("requiredCategorys").style.display = "none";
}
