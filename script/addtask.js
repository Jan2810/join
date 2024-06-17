let activeUrg = {
    "high": false,
    "mid": false,
    "low": false
}

async function initAddTask() {
    await includeHTML();
    changeUrgency("mid")
};

function changeUrgency(urg) {
    if(urg === "high") {
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
    } else if (boolean === false && id === "img-high" && activeUrg.high === false){
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

function enterIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-blue.png";
}

function outIcon() {
    document.getElementById("task-x").src = "../assets/icons-addtask/clear-black.png";
}