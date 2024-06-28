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
        let contacts = await loadData(CONTACTS_URL);
        for (let i = 0; i < contacts.length; i++) {
            if (contacts.length > checkedContacts.length) {
                const count = checkedContacts.push(false);
            }
        }
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
    if (checkedContacts[i] === true) {
        displayAssignmentsEdit("checked", i)
    } else if (checkedContacts[i] === false) {
        displayAssignmentsEdit("unchecked", i)
    }
};

async function assignContactEdit(i) {
    if (checkedContacts[i] === true) {
        checkedContacts[i] = false;
    } else if (checkedContacts[i] === false) {
        checkedContacts[i] = true;
    }
    renderSignListEdit();
    checkAssignmentsEdit(i);
};

async function renderSignListEdit() {
    let content = document.getElementById("signContainerEdit");
    controlCheckedLengthEdit();
    content.innerHTML = "";
    let contacts = await loadData(CONTACTS_URL);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (checkedContacts[i] === true) {
            content.innerHTML += returnSignListEdit(contact, i)
        }
    }
};

function controlCheckedLengthEdit() {
    let container = document.getElementById("signContainerEdit");
    let trueCount = checkedContacts.filter(value => value === true).length;
    if (trueCount >= 1) {
        container.style.display = "";
    } else if (trueCount < 1) {
        container.style.display = "none";
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
    changeBgBtnEdit()
};

function changeBgBtnEdit() {
    if (activeUrg[0].active === true) {
        highlightButtonEdit("high");
    }
    if (activeUrg[1].active === true) {
        highlightButtonEdit("mid");
    }
    if (activeUrg[2].active === true) {
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
    } else if (boolean === false && newId === "img-highEdit" && activeUrg[0].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-high-color.png";
    }
    if (boolean === true && newId === "img-midEdit") {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && newId === "img-midEdit" && activeUrg[1].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-mid-color.png";
    }
    if (boolean === true && newId === "img-lowEdit") {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && newId === "img-lowEdit" && activeUrg[2].active === false) {
        document.getElementById(newId).src = "../assets/icons-addtask/prio-low-color.png";
    }
};