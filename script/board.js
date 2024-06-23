let tasksArray = [];
let filteredTasks = [];
let currentDraggedElement;

// let taskData = {
//     "title": "",
//     "description": "",
//     "assigned_to": [],
//     "due_date": "",
//     "priority": "",
//     "category": "",
//     "subtasks": [],
//     "status": ""
// };

setTimeout(() => {
    console.log("Alle Tasks:")
    console.log(tasksArray)
}, 500);

async function getTasks() {
    tasksArray = await loadData(TASKS_URL);
}

function initBoard() {
    updateTodos();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
}

async function updateTasksByStatus(status, containerId) {
    if (tasksArray.length === 0) {
        await getTasks();
    }
    let tasks = tasksArray.filter(t => t['status'] === status);
    console.log("Category: " + status);
    console.log(tasks);
    document.getElementById(containerId).innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById(containerId).innerHTML += generateTicketHTML(i, element, categoryBG);
    }

    if (document.getElementById(containerId).innerHTML === '') {
        document.getElementById(containerId).innerHTML = generatePlaceholderHTML();
    }
}

function updateTodos() {
    updateTasksByStatus('todo', 'board-ticket-container-todo');
}

function updateInProgress() {
    updateTasksByStatus('inprogress', 'board-ticket-container-in-progress');
}

function updateAwaitFeedback() {
    updateTasksByStatus('awaitfeedback', 'board-ticket-container-await-feedback');
}

function updateDone() {
    updateTasksByStatus('done', 'board-ticket-container-done');
}

function filterTasks() {
    let search = document.getElementById('board-find-input').value.toLowerCase();
    filteredTasks = tasksArray.filter(task => task.title.toLowerCase().includes(search));
    updateFilteredTodos();
    updateFilteredInProgress();
    updateFilteredAwaitFeedback()
    updateFilteredDone();
}

function updateFilteredTasks(status, containerId) {
    let tasks = filteredTasks.filter(t => t['status'] === status);
    // console.log(status);
    // console.log(tasks);
    document.getElementById(containerId).innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById(containerId).innerHTML += generateTicketHTML(i, element, categoryBG);
    }

    if (document.getElementById(containerId).innerHTML === '') {
        document.getElementById(containerId).innerHTML = generatePlaceholderHTML();
    }
}

function startFilterTasks() {
    if (document.getElementById('board-find-input').value.length >= 2) {
        filterTasks()
    } else {
        initBoard();
    }
}

function startFilterTasksResponsive() {
    if (document.getElementById('board-find-input-responsive').value.length >= 2) {
        filterTasksResponsive()
    } else {
        initBoard();
    }
}

function filterTasksResponsive() {
    let search = document.getElementById('board-find-input-responsive').value.toLowerCase();
    filteredTasks = tasksArray.filter(task => task.title.toLowerCase().includes(search));
    updateFilteredTodos();
    updateFilteredInProgress();
    updateFilteredAwaitFeedback()
    updateFilteredDone();
}

function updateFilteredTodos() {
    updateFilteredTasks('todo', 'board-ticket-container-todo');
}

function updateFilteredInProgress() {
    updateFilteredTasks('inprogress', 'board-ticket-container-in-progress');
}

function updateFilteredAwaitFeedback() {
    updateFilteredTasks('awaitfeedback', 'board-ticket-container-await-feedback');
}

function updateFilteredDone() {
    updateFilteredTasks('done', 'board-ticket-container-done');
}

function generateTicketHTML(i, element, categoryBG) {
    let assignedHTML = '';
    for (let j = 0; j < element['assigned_to'].length; j++) {
        let initials = getNameSign(element['assigned_to'][j]);
        assignedHTML += `<div class="board-ticket-assigned flex-center">${initials}</div>`;
    }
    return `
<div id="board-ticket${element['id']}" draggable="true" ondragstart="startDragging(${element['id']})" class="board-ticket" onclick="showTask(${element['id']})">
    <div class="board-ticket-content flex-column">
        <div class="board-ticket-gategory ${categoryBG}-bg">${element['category']}</div>
        <div class="board-ticket-description">
            <div class="board-ticket-headline">${element['title']}</div>
            <div class="board-ticket-task">${element['description']}</div>
        </div>
        <div class="board-ticket-statusbar flex-row">
            <div class="board-ticket-bar">
                <div class="board-ticket-bar-progress"></div>
            </div>
            <div class="board-ticket-progress">${element['subtasks'].length}/${element['subtasks'].length} Subtasks</div>
        </div>
        <div class="flex-row flex-sb flex-center">
            <div class="board-ticket-assigned-container flex-row">
                ${assignedHTML}
            </div>
            <div class="board-ticket-priority">
                <img src="../assets/icons-addtask/prio-${element['priority']}-color.png" alt="priority">
            </div>
        </div>
    </div>
</div>`;
}


function generatePlaceholderHTML() {
    return `<div class="board-no-tasks-placeholder flex-center">No tasks to do</div>`
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasksArray[currentDraggedElement]['status'] = status;
}
