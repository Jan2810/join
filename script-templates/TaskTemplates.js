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
};

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
};

function showWarning() {
    document.getElementById("subtasksInput").value = "";
    document.getElementById("subtaskInputCont").style.borderColor = "";
    document.getElementById("requiredSubtext").style.display = "none";
};

function hideWarning() {
    document.getElementById("subtaskInputCont").style.borderColor = "red";
    document.getElementById("requiredSubtext").style.display = "block";
    document.getElementById("subtasksInput").focus();
};

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
};

function enterIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-blue.png";
};

function outIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-black.png";
};

function openCategorys() {
    document.getElementById("dropdownCategoryToggle").style.display = "none";
    document.getElementById("dropdownCategoryContainer").style.display = "";
    document.getElementById("dropdownCategorys").style.display = "flex";
    renderTaskList();
};

function closeCategorys(ev) {
    ev.stopPropagation();
    document.getElementById("dropdownCategoryToggle").style.display = "";
    document.getElementById("dropdownCategoryContainer").style.display = "none";
    document.getElementById("dropdownCategorys").style.display = "none";
};

function openCalender() {
    document.getElementById("taskDate").showPicker();
    document.getElementById("taskDate").style.color = "black";
};

function returnTaskListHTML(category, i) {
    return `
        <div onclick="addCategory(${i}); closeCategorys(event);" class="category-dd-item" id="ctg${i}">
            <div class="task-cnt-name">${category}</div>
        </div>
        `;
};

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
};

function returnContactList(cnt, i) {
    return `
        <div onclick="assignContact(${i})" class="dropdown-item" id="cntnum${i}" data-value="${i}">
            <div class="task-cnt-sign flex-center" id="contactsign${i}" style='${backgroundColors[i]}'>${getNameSign(cnt.name)}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimg${i}" src="../assets/icons/rb-unchecked.png" alt="check">
        </div>
    `;
};

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
};
