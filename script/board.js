function initBoard() {
    updateTodos();
    updateInProgress();
    updateAwaitFeedback();
    updateDone();
}

async function updateTasksByStatus(status, categoryId) {
    let dataArray = await loadData(TASKS_URL)
    let tasks = dataArray.filter(t => t['status'] === status);
    console.log(tasks);
    document.getElementById(categoryId).innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById(categoryId).innerHTML += generateTicketHTML(element, categoryBG);
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
    
}





function generateTicketHTML(element, categoryBG) {
    return `<div draggable="true" class="board-ticket" onclick="showTask()">
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