let tasksArray = [];

async function initTaskArray() {
    tasksArray = await loadData(TASKS_URL);
}

function initBoard() {
    updateTodos();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
}

async function updateTasksByStatus(status, categoryId) {
    if (tasksArray.length === 0) {
        await initTaskArray();
    }
    let tasks = tasksArray.filter(t => t['status'] === status);
    console.log(tasks);
    document.getElementById(categoryId).innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById(categoryId).innerHTML += generateTicketHTML(element, categoryBG);
    }

    if (categoryId.innerHTML = '') {
        categoryId.innerHTML = `<div class="board-no-tasks-placeholder flex-center">No tasks to do</div>`
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

function startFilterTasks() {
    if (document.getElementById('board-find-input').value.length >= 2) {
        filterTasks()
    } else {
        initBoard();
    }
}

function filterTasks() {
    let search = document.getElementById('board-find-input').value.toLowerCase();
    let filteredTasks = tasksArray.filter(task => task.title.toLowerCase().includes(search));
    showFilteredTasks(filteredTasks);
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
    let filteredTasks = tasksArray.filter(task => task.title.toLowerCase().includes(search));
    showFilteredTasks(filteredTasks);
}

function showFilteredTasks(filteredTasks) {
    let containers = {
        'todo': document.getElementById('board-ticket-container-todo'),
        'inprogress': document.getElementById('board-ticket-container-in-progress'),
        'awaitfeedback': document.getElementById('board-ticket-container-await-feedback'),
        'done': document.getElementById('board-ticket-container-done')
    };
    for (let key in containers) {
        containers[key].innerHTML = '';
    }
    filteredTasks.forEach(task => {
        let categoryBG = task['category'].replace(/\s+/g, '-').toLowerCase();
        containers[task['status']].innerHTML += generateTicketHTML(task, categoryBG);
    });
    for (let key in containers) {
        if (containers[key].innerHTML === '') {
            containers[key].innerHTML = '<div class="board-no-tasks-placeholder flex-center">No tasks to do</div>';
        }
    }
}

function generateTicketHTML(element, categoryBG) {
    return `<div id="board-ticket" draggable="true" class="board-ticket" onclick="showTask(${element})">
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
        <div class="flex-row flex-sb">
            <div>Users</div>
            <div class="board-ticket-priority"><img src="../assets/icons-addtask/prio-${element['priority']}-color.png" alt="priority"></div>
        </div>
    </div>
</div>`
}