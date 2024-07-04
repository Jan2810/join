/**
 * Returns the HTML string for the subtask list in editing mode.
 * @param {Object} subtask - The subtask object.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML string for the subtask list.
 */
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

/**
 * Returns the HTML string for editing a subtask.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML string for editing the subtask.
 */
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

/**
 * Returns the HTML string for the contact list in editing mode.
 * @param {Object} cnt - The contact object.
 * @param {number} i - The index of the contact.
 * @returns {string} The HTML string for the contact list.
 */
function returnContactListEdit(cnt, i) {
    return `
        <div onclick="assignContactEdit(${i})" class="dropdown-item" id="cntnumEdit${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsignEdit${i}" style="background-color: ${cnt.color};">${getInitials(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimgEdit${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
};

/**
 * Returns the HTML string for the subtask input field in editing mode.
 * @returns {string} The HTML string for the subtask input field.
 */
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

/**
 * Shows a warning message when the maximum number of contacts is reached in editing mode.
 */
function showMaxContactsEdit() {
    document.getElementById("maxContactsEdit").style.display = "";
    displayContactsEdit("close");
};

/**
 * Hides the warning message when the maximum number of contacts is reached in editing mode.
 */
function hideMaxContactsEdit() {
    document.getElementById("maxContactsEdit").style.display = "none";
};

/**
 * Highlights the urgency button in editing mode.
 * @param {string} urg - The urgency level.
 */
function highlightButtonEdit(urg) {
    if (urg === "high") {
        document.getElementById("highEdit").classList.add("high-focus");
        document.getElementById("midEdit").classList.remove("mid-focus");
        document.getElementById("lowEdit").classList.remove("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-white.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "mid") {
        document.getElementById("highEdit").classList.remove("high-focus");
        document.getElementById("midEdit").classList.add("mid-focus");
        document.getElementById("lowEdit").classList.remove("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-white.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-color.png`;
    } else if (urg === "low") {
        document.getElementById("highEdit").classList.remove("high-focus");
        document.getElementById("midEdit").classList.remove("mid-focus");
        document.getElementById("lowEdit").classList.add("low-focus");
        document.getElementById("img-highEdit").src = `../assets/icons-addtask/prio-high-color.png`;
        document.getElementById("img-midEdit").src = `../assets/icons-addtask/prio-mid-color.png`;
        document.getElementById("img-lowEdit").src = `../assets/icons-addtask/prio-low-white.png`;
    }
};

/**
 * Hides the warning message for the subtask input field in editing mode.
 */
function hideWarningEdit() {
    document.getElementById("subtasksInputEdit").value = "";
    document.getElementById("subtaskInputContEdit").style.borderColor = "";
    document.getElementById("requiredSubtextEdit").style.display = "none";
};

/**
 * Shows a warning message for the subtask input field in editing mode.
 */
function showWarningEdit() {
    document.getElementById("subtaskInputContEdit").style.borderColor = "red";
    document.getElementById("requiredSubtextEdit").style.display = "block";
    document.getElementById("subtasksInputEdit").focus();
};
