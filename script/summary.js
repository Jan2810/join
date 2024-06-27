let statusArray = [];

async function sumStart() {
    await includeHTML();
    await filterTaskStatus()
    checkForLoginGreet();
    document.getElementById("firstRowCont1").classList.add("bg-darkblue");
    document.getElementById("firstRowCont2").classList.add("bg-darkblue");
};

function checkForLoginGreet() {
    if (document.referrer == "../index.html") {
        console.log("Welcome")
    }
}

function changeColor1() {
    document.getElementById("firstRowCont1").classList.remove("bg-darkblue");
    document.getElementById('firstRowCont1').classList.add("bg-white");
    document.getElementById("sumEdit").src = "../assets/icons/edit-black.svg";
};

function recreateColor1() {
    document.getElementById('firstRowCont1').classList.remove("bg-white");
    document.getElementById("firstRowCont1").classList.add("bg-darkblue");
    document.getElementById("sumEdit").src = "../assets/icons/edit-white.svg";
};

function changeColor2() {
    document.getElementById("firstRowCont2").classList.remove("bg-darkblue");
    document.getElementById('firstRowCont2').classList.add("bg-white");
    document.getElementById("sumHook").src = "../assets/icons/hook-sum-dark.png";
};

function recreateColor2() {
    document.getElementById("firstRowCont2").classList.add("bg-darkblue");
    document.getElementById('firstRowCont2').classList.remove("bg-white");
    document.getElementById("sumHook").src = "../assets/icons/hook-sum-white.png";
};

async function filterTaskStatus() {
    let tasks = await loadData(TASKS_URL);
    let todos = tasks.filter(task => task.status === "todo");
    let inProgress = tasks.filter(task => task.status === "inprogress");
    let awaitFeedback = tasks.filter(task => task.status === "awaitfeedback");
    let done = tasks.filter(task => task.status === "done");
    let urgent = tasks.filter(task => task.priority === "high");
    statusArray.push({ "category": todos, "length": todos.length });
    statusArray.push({ "category": inProgress, "length": inProgress.length });
    statusArray.push({ "category": awaitFeedback, "length": awaitFeedback.length });
    statusArray.push({ "category": done, "length": done.length });
    statusArray.push({ "category": urgent, "length": urgent.length, "due_date": urgent[0]["due_date"] });
    document.getElementById("sumBody").innerHTML = "";
    document.getElementById("sumBody").innerHTML = returnSummaryHTML(tasks);
};

function getActualGreet() {
    let today = new Date();
    let hourNow = today.getHours();
    if (hourNow <= 12 && hourNow >= 0) {
        return "Good Morning";
    } else if (hourNow >= 12 && hourNow <= 18) {
        return "Good Afternoon";
    } else if (hourNow >= 18 && hourNow <= 24) {
        return "Good Morning";
    } else {
        return "Welcome";
    }
};

function getUser() {
    if (activeUser.name !== "Gast Nutzer") {
        return activeUser.name
    } else {
        return "";
    }
};

function getUpcomingTask(prioTasks) {
    let prioDates = [];
    prioTasks.forEach(task => {
        prioDates.push(task.due_date)
    });
    let sortedDates = prioDates.sort(function (a, b) {
        return new Date(a) - new Date(b);
    });
    return sortedDates[0];
}

function returnSummaryHTML(tasks) {
    let firstUrgentDate = getUpcomingTask(statusArray[4].category);
    let date = formatDate(firstUrgentDate);
    return `
        <div class="flex-center summary-headline mgn-l-328">
            <h1>Join 360</h1>
            <img class="sum-headbar" src="../assets/img/bar-blue.png" alt="bar">
            <h3>Key Metrics at a Glance</h3>
        </div>
        <div class="flex-center summary-headline2 mgn-l-328">
            <h1>Join 360</h1>
            <h3>Key Metrics at a Glance</h3>
            <div class="sum-bluebar-cont">
                <img src="../assets/img/bar-blue-horizontal.png" alt="bar">
            </div>
        </div>
        <div class="flex-row sum-stats-cont mgn-l-328">
            <div class="summary-stats flex-column">
                <div class="flex-row sum-first-row">
                    <a href="./board.html" onmouseenter="changeColor1()" onmouseleave="recreateColor1()"
                        class="sum-first-row-cont flex-center flex-row">
                        <div id="firstRowCont1" class="flex-center sum-icon-container">
                            <img id="sumEdit" src="../assets/icons/edit-white.svg" alt="">
                        </div>
                        <div class="sum-number-container flex-center flex-column">
                            <div class="sum-number">${statusArray[0].length}</div>
                            <p>To-do</p>
                        </div>
                    </a>
                    <a href="./board.html" onmouseover="changeColor2()" onmouseleave="recreateColor2()"
                        class="sum-first-row-cont flex-center flex-row">
                        <div id="firstRowCont2" class="flex-center sum-icon-container">
                            <img id="sumHook" src="../assets/icons/hook-sum-white.png" alt="">
                        </div>
                        <div class="sum-number-container flex-center flex-column">
                            <div class="sum-number">${statusArray[3].length}</div>
                            <p>Done</p>
                        </div>
                    </a>
                </div>
                <a href="./board.html">
                    <div class="sum-sec-row flex-row flex-center">
                        <div class="sum-urgency">
                            <div class="flex-center sum-icon-container bg-red">
                                <img class="" src="../assets/icons-addtask/prio-high-white.png" alt="">
                            </div>
                            <div class="flex-center flex-column">
                                <div class="sum-number">${statusArray[4].length || 0}</div>
                                <p>Urgent</p>
                            </div>
                        </div>
                        <img class="sum-grey-bar" src="../assets/img/bar-grey.png" alt="">
                        <div class="sum-date flex-center flex-column">
                            <p><b>${date}</b></p>
                            <p class="sum-dateline">Upcoming Deadline</p>
                        </div>
                    </div>
                </a>
                <div class="sum-third-row flex-row flex-center">
                    <a class="sum-third-cont flex-center bg-white" href="./board.html">
                        <div class="sum-third-parent flex-center flex-column">
                            <div class="sum-big-number">${tasks.length}</div>
                            <p class="text-center">Tasks in Board</p>
                        </div>
                    </a>
                    <a class="sum-third-cont flex-center bg-white" href="./board.html">
                        <div class="sum-third-parent flex-center flex-column">
                            <div class="sum-big-number">${statusArray[1].length}</div>
                            <p class="text-center">Tasks in Progress</p>
                        </div>
                    </a>
                    <a class="sum-third-cont flex-center bg-white" href="./board.html">
                        <div class="sum-third-parent flex-center flex-column">
                            <div class="sum-big-number">${statusArray[2].length}</div>
                            <p class="text-center">Awaiting Feedback</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="sum-greet-cont flex-center flex-column">
                <h2 class="color-darkblue">${getActualGreet()}</h2>
                <h1 class="color-lightblue">${getUser()}</h1>
            </div>
        </div>
    `;
};
