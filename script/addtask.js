let activeUrg = {
    "high": false,
    "mid": false,
    "low": false
}

let contacts = [
    {
        "name": "Sofia Müller",
        "sign": "SM",
        "color": "background: rgba(0, 190, 232, 1)",
        "checked": false,
        "userAccount": true
    },
    {
        "name": "Anton Mayer",
        "sign": "AM",
        "color": "background: rgba(255, 122, 0, 1)",
        "checked": false,
        "userAccount": false
    },
    {
        "name": "Anja Schulz",
        "sign": "AS",
        "color": "background: rgba(147, 39, 255, 1)",
        "checked": false,
        "userAccount": false
    },
    {
        "name": "Benedikt Ziegler",
        "sign": "BZ",
        "color": "background: rgba(110, 82, 255, 1)",
        "checked": false,
        "userAccount": false
    },
    {
        "name": "David Eisenberg",
        "sign": "DE",
        "color": "background: rgba(252, 113, 255, 1)",
        "checked": false,
        "userAccount": false
    }
];

async function initAddTask() {
    await includeHTML();
    changeUrgency("mid")
};

function changeUrgency(urg) {
    if (urg === "high") {
        activeUrg.high = true;
        activeUrg.mid = false;
        activeUrg.low = false;
    } else if (urg === "mid") {
        activeUrg.high = false;
        activeUrg.mid = true;
        activeUrg.low = false;
    } else if (urg === "low") {
        activeUrg.high = false;
        activeUrg.mid = false;
        activeUrg.low = true;
    }
    changeBgOfBtn()
};

function changeBgOfBtn() {
    if (activeUrg.high === true) {
        document.getElementById("high").classList.add("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-white.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-orange.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-green.png`;
    }
    if (activeUrg.mid === true) {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.add("mid-focus");
        document.getElementById("low").classList.remove("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-red.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-white.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-green.png`;
    }
    if (activeUrg.low === true) {
        document.getElementById("high").classList.remove("high-focus");
        document.getElementById("mid").classList.remove("mid-focus");
        document.getElementById("low").classList.add("low-focus");
        document.getElementById("img-high").src = `../assets/icons-addtask/prio-high-red.png`;
        document.getElementById("img-mid").src = `../assets/icons-addtask/prio-mid-orange.png`;
        document.getElementById("img-low").src = `../assets/icons-addtask/prio-low-white.png`;
    }
};


function hoverBtn(boolean, id) {
    if (boolean === true && id === "img-high") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-white.png";
    } else if (boolean === false && id === "img-high" && activeUrg.high === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-high-red.png";
    }
    if (boolean === true && id === "img-mid") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-white.png";
    } else if (boolean === false && id === "img-mid" && activeUrg.mid === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-mid-orange.png";
    }
    if (boolean === true && id === "img-low") {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-white.png";
    } else if (boolean === false && id === "img-low" && activeUrg.low === false) {
        document.getElementById(id).src = "../assets/icons-addtask/prio-low-green.png";
    }
};

function openCalender() {
    document.getElementById("taskDate").showPicker();
    document.getElementById("taskDate").style.color = "black";
};


function openContacts() {
    document.getElementById("dropdownToggle").style.display = "none";
    document.getElementById("dropdownInput").style.display = "block";
    document.getElementById("dropdownMenu").style.display = "block";
    renderContactList();
};

function closeContacts() {
    document.getElementById("dropdownToggle").style.display = "flex";
    document.getElementById("dropdownInput").style.display = "none";
    document.getElementById("dropdownMenu").style.display = "none";
    document.getElementById("dropdownInput").value = "";
};

function renderContactList() {
    let content = document.getElementById("dropdownMenu");
    content.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        content.innerHTML += returnContactList(contact, i);
    }
};

function stopProp(ev) {
    ev.stopPropagation();
}

function enterIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-blue.png";
};

function outIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-black.png";
};

function returnContactList(cnt, i) {

    return `
        <div onclick="checkcnt(${i})" class="dropdown-item" id="cntnum${i}" data-value="${i + 1}">
            <div class="task-cnt-sign" id="contactsign${i}" style='${cnt.color}'>${cnt.sign}</div>
            <div class="task-cnt-name">${cnt.name}</div>
            <img id="cntimg${i}" src="" alt="User Image">
        </div>
    `;
};

function checkcnt(i) {
    if (contacts[i].checked === false) {
        console.log("checked");
        contacts[i].checked = true;
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-checked.png";
        renderContactList();
    } else if (contacts[i].checked === true) {
        console.log("unchecked");
        contacts[i].checked = false;
        document.getElementById(`cntimg${i}`).src = "../assets/icons/rb-unchecked.png";
        renderContactList();
    }
}