function bgClickTracker() { bg.addEventListener("click", () => { console.log("TaskBackground clicked!!!") }) };

let tasksArray = [];
let filteredTasks = [];
let currentDraggedElement;

async function getTasks() {
    tasksArray = await loadData(TASKS_URL);
    console.log("Alle Tasks");
    console.log(tasksArray);
    if (tasksArray.length > 0) {
        initBoard();
    }
};

async function initBoard() {
    await updateTodos();
    await updateInProgress();
    await updateAwaitFeedback();
    await updateDone();
    setBackground(2);
};

async function updateTasksByStatus(status, containerId) {
    if (tasksArray.length === 0) {
        await getTasks();
    }
    let tasks = tasksArray.filter(t => t['status'] === status);

    let container = document.getElementById(containerId);
    container.innerHTML = '';

    if (tasks.length > 0) {
        let taskHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            const element = tasks[i];
            let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
            taskHTML += generateTicketHTML(element, categoryBG);
        }
        container.innerHTML = taskHTML;
    } else {
        container.innerHTML = generatePlaceholderHTML();
    }
};


async function updateTodos() {
    await updateTasksByStatus('todo', 'board-ticket-container-todo');
};

async function updateInProgress() {
    await updateTasksByStatus('inprogress', 'board-ticket-container-in-progress');
};

async function updateAwaitFeedback() {
    await updateTasksByStatus('awaitfeedback', 'board-ticket-container-await-feedback');
};

async function updateDone() {
    await updateTasksByStatus('done', 'board-ticket-container-done');
};

function startFilterTasks(inputId) {
    const search = document.getElementById(inputId).value.toLowerCase();
    if (search.length >= 2) {
        filterTasks(search)
    } else {
        initBoard();
    }
};

function filterTasks(search) {
    filteredTasks = tasksArray.filter(task => task.title.toLowerCase().includes(search));
    updateFilteredTodos();
    updateFilteredInProgress();
    updateFilteredAwaitFeedback()
    updateFilteredDone();
};

function updateFilteredTasks(status, containerId) {
    let tasks = filteredTasks.filter(t => t['status'] === status);
    document.getElementById(containerId).innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById(containerId).innerHTML += generateTicketHTML(element, categoryBG);
    }

    if (document.getElementById(containerId).innerHTML === '') {
        document.getElementById(containerId).innerHTML = generatePlaceholderHTML();
    }
};

function updateFilteredTodos() {
    updateFilteredTasks('todo', 'board-ticket-container-todo');
};

function updateFilteredInProgress() {
    updateFilteredTasks('inprogress', 'board-ticket-container-in-progress');
};

function updateFilteredAwaitFeedback() {
    updateFilteredTasks('awaitfeedback', 'board-ticket-container-await-feedback');
};

function updateFilteredDone() {
    updateFilteredTasks('done', 'board-ticket-container-done');
};

function startDragging(id) {
    currentDraggedElement = id;

    const ticketContainer = document.querySelector('.board-ticket-container');
    ticketContainer.classList.remove('overflow-x-scroll')
    ticketContainer.classList.add('overflow-visible');

    document.getElementById(`board-ticket${id}`).classList.add('board-ticket-tend');
};

function endDragging(id) {
    const ticketContainer = document.querySelector('.board-ticket-container');
    ticketContainer.classList.remove('overflow-visible')
    ticketContainer.classList.add('overflow-x-scroll');

    document.getElementById(`board-ticket${id}`).classList.remove('board-ticket-tend');
};

function allowDrop(ev) {
    ev.preventDefault();
};

function moveTo(status) {
    const currentTask = tasksArray.find((ct) => ct['id'] === currentDraggedElement);
    currentTask['status'] = status;
    putData(TASKS_URL, tasksArray);
    initBoard();
};

function generateTicketHTML(element, categoryBG) {
    let subtaskProgressHTML = getSubtasksProgress(element);
    let assignedHTML = getContacts(element);

    return `
        <div id="board-ticket${element['id']}" class="board-ticket" draggable="true" ondragstart="startDragging('${element['id']}')" ondragend="endDragging('${element['id']}')" onclick="showTask('${element['id']}')">
            <div class="board-ticket-content flex-column">
                <div class="board-ticket-gategory ${categoryBG}-bg">${element['category']}</div>
                <div class="board-ticket-description">
                    <div class="board-ticket-headline">${element['title']}</div>
                    <div class="board-ticket-task">${element['description']}</div>
                </div>
                ${subtaskProgressHTML}
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
};

function getContacts(element) {
    // console.log(element);
    let assignedHTML = '';
    if (element['assigned_to'].length > 3) {
        let initials = getInitials(element['assigned_to'][0]);
        assignedHTML += `<div class="board-ticket-assigned flex-center">${initials}</div><div class="board-ticket-assigned flex-center">+${element['assigned_to'].length -= 1}</div>`;
    } else {
        for (let j = 0; j < element['assigned_to'].length; j++) {
            let initials = getInitials(element['assigned_to'][j]);
            assignedHTML += `<div class="board-ticket-assigned flex-center">${initials}</div>`;
        }
    }
    return assignedHTML;
}

function getSubtasksProgress(element) {
    let subtasks = element['subtasks'];
    let subtasksLength = element['subtasks'].length;

    if (subtasksLength > 0) {
        let checkedSubtasks = subtasks.filter(cs => cs['status'] === 'checked');
        let checkedSubtasksLength = checkedSubtasks.length;
        let subtaskProgress = (checkedSubtasksLength / subtasksLength) * 100;
        return `
            <div id="board-ticket-statusbar" class="board-ticket-statusbar flex-row flex-center">
                <div class="board-ticket-bar">
                    <div id="board-ticket-bar-progress" style="width: ${subtaskProgress}%"></div>
                </div>
                <div class="board-ticket-progress">${checkedSubtasksLength}/${subtasksLength} Subtasks</div>
            </div>`
            ;
    } else {
        return '';
    }
};


function generatePlaceholderHTML() {
    return `<div class="board-no-tasks-placeholder flex-center">No tasks to do</div>`
};

