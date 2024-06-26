function openAddTaskInBoard(status) {
    setStatus(status);
    if (window.innerWidth > 800) {
        document.getElementById("addTaskBg").style.display = "";
        document.getElementById("newTaskContainer").innerHTML = "";
        document.getElementById("newTaskContainer").innerHTML += returnAddTaskInBoardHTML();
        setTimeout(() => {
            document.getElementById("newTaskContainer").style.transform = "translateX(0px)"
            changeUrgency("mid");
        }, 100)
    } else {
        statusReset(status)
        goToAddTask();
    }
};

function closeNewTaskInBoard() {
    let bg = document.getElementById("addTaskBg");
    let container = document.getElementById("newTaskContainer")
    container.style.transform = "translateX(1500px)"
    setTimeout(() => {
        bg.style.display = "none";
    }, 100)
};

function setStatus(status) {
    taskData = {
        "title": "",
        "description": "",
        "assigned_to": [],
        "due_date": "",
        "priority": "",
        "category": "",
        "subtasks": [],
        "status": status
    };
};

function statusReset(status) {
    localStorage.setItem('status', status);
}

function goToAddTask() {
    window.location = "../html/addtask.html";
}

function returnAddTaskInBoardHTML() {
    return `
        <div class="task-h1 flex-row task-board-h1">
            <h1>Add Task</h1>
            <img onclick="closeNewTaskInBoard()" src="../assets/icons/x-black.png" alt="x">
        </div>
        <form>
            <div class="flex-row task-content in-board-task-cnt">
                <div class="task-left-cont">
                    <div class="task-width">
                        <h3 class="task-form-font">Title<span class="task-star">*</span></h3>
                        <input id="taskTitle" class="task-width task-form-font task-input" type="text" placeholder="Enter a title"
                            required>
                            <span id="requiredTitle" class="required-text" style="display: none;">This field is required</span>
                    </div>
                    <div>
                        <h3 class="task-form-font">Description</h3>
                        <textarea id="taskDescription" class="task-width task-form-font task-textarea task-input" type="text"
                            placeholder="Enter a Description"></textarea>
                    </div>
                    <div>
                        <h3 class="task-form-font">Assigned to</h3>
                        <div onclick="openContacts(); stopProp(event);" class="dropdown task-width">
                            <div class="dropdown-toggle" id="dropdownToggle">
                                <span id="selectedItem">Select contacts to assign</span>
                                <img src="../assets/icons/dropdown.png">
                            </div>
                            <div class="dropdown-menu" id="dropdownMenuContainer" style="display: none;">
                                <div onclick="closeContacts(event)" class="upper-dropdown-item bg-white">
                                    <span>Select contacts to assign</span>
                                    <img src="../assets/icons/dropup.png" alt="">
                                </div>
                                <div id="dropdownMenu">
                                    <!-- rendered with openContacts()  -->
                                </div>
                            </div>
                            <div id="signParentContainer" class="flex-center" style="width: 100%;">
                                <div id="signContainer" class="task-sign-cont task-width flex-center"
                                    style="display: none;">
                                    <!-- rendered signs -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="task-right-cont" id="taskRightCont">
                    <div class="task-width">
                        <h3 class="task-form-font">Due date<span class="task-star">*</span></h3>
                        <div class="task-date-input task-width">
                            <input onclick="openCalender()" id="taskDate"
                                class="task-date-input task-form-font color-lightgrey bg-white task-input" type="date"
                                required>
                                <span id="requiredDate" class="required-text" style="display: none;">This field is required</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="task-form-font">Prio</h3>
                        <div class="flex-row task-btn-cont">
                            <div onclick="changeUrgency('high')" onmouseover="hoverBtn(true, 'img-high')"
                                onmouseout="hoverBtn(false, 'img-high')" class="task-urgent-btn bg-white" id="high">
                                <span>Urgent</span>
                                <img id="img-high" src="../assets/icons-addtask/prio-high-color.png" alt="">
                            </div>
                            <div onclick="changeUrgency('mid')" onmouseover="hoverBtn(true, 'img-mid')"
                                onmouseout="hoverBtn(false, 'img-mid')" class="task-urgent-btn bg-white" id="mid">
                                <span>Medium</span>
                                <img id="img-mid" src="../assets/icons-addtask/prio-mid-white.png" alt="">
                            </div>
                            <div onclick="changeUrgency('low')" onmouseover="hoverBtn(true, 'img-low')"
                                onmouseout="hoverBtn(false, 'img-low')" class="task-urgent-btn bg-white" id="low">
                                <span>Low</span>
                                <img id="img-low" src="../assets/icons-addtask/prio-low-color.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="task-form-font">Category<span class="task-star">*</span></h3>
                        <div onclick="openCategorys(); stopProp(event);" class="dropdown task-width">
                            <div class="dropdown-toggle ctg-input-cnt" id="dropdownCategoryToggle">
                                <input onclick="openCategorys(); preventDf(event); stopProp(event);" id="categoryInput" type="text" placeholder="Select task category" 
                                class="category-dd-upper-item-input task-width bg-white" required>
                                <img src="../assets/icons/dropdown.png">
                            </div>
                            <div class="dropdownmenu-ctg" id="dropdownCategoryContainer" style="display: none;">
                                <div onclick="closeCategorys(event)" class="category-dd-upper-item bg-white">
                                    <span>Select task category</span>
                                    <img src="../assets/icons/dropup.png" alt="">
                                </div>
                                <div id="dropdownCategorys" class="dropdown-ctg">
                                    <!-- rendered Categorys  -->
                                </div>
                            </div>
                            <span id="requiredCategorys" class="required-text" style="display: none;">This field is required</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="task-form-font">Subtasks</h3>
                        <div >
                            <div onkeydown="checkKey(event)" onclick="openSubtasks(); stopProp(event);" id="subtaskInputCont" class="task-width task-form-font subtask-input-cont">
                                <input id="subtasksInput" class="subtasks-input task-input" type="text"
                                    placeholder="Add new subtask">
                                <div id="subtaskImgCont" class="subtask-img-cont flex-center">
                                    <div class="img-cont-subtask">
                                        <img src="../assets/icons/add.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <span id="requiredSubtext" class="required-text" style="display: none;">Cannot set empty subtask</span>
                            <div class="rendered-subtasks" id="addedSubtasks">
                                <!-- rendered subtasks -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="task-bottom-line-cont add-task-bottom-line-board flex-center">
                <div class="flex-row flex-center task-bottom-line">
                    <p><span class="task-star">*</span>This field is required</p>
                    <div class="flex-center task-form-btn-cont">
                        <div class="task-clear-btn" onclick="clearAll()" onmouseover="enterIcon()" onmouseout="outIcon()">
                            <span>Clear</span>
                            <img id="task-x" src="../assets/icons/x-black.png" alt="">
                        </div>
                        <button onclick="addNewTask(); return false" type="submit" id="createButton" class="task-send-form-btn">
                            <span>Create Task</span>
                            <img src="../assets/icons/hook-white.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </form>
    `;
}