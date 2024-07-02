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

function returnContactListEdit(cnt, i) {
    return `
        <div onclick="assignContactEdit(${i})" class="dropdown-item" id="cntnumEdit${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsignEdit${i}" style="background-color: ${cnt.color};">${getInitials(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimgEdit${i}" src="../assets/icons/rb-unchecked.png" alt="check">
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

function showMaxContactsEdit() {
    document.getElementById("maxContactsEdit").style.display = "";
    displayContactsEdit("close");
};

function hideMaxContactsEdit() {
    document.getElementById("maxContactsEdit").style.display = "none";
};

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