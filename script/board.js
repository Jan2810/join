function initBoard() {
    loadData(TASKS_URL);
}

function updateTasks(dataArray) {
    let todo = dataArray.filter(t => t['status'] == 'todo');
    console.log(todo);
    document.getElementById('board-ticket-container-todo').innerHTML ='';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        let categoryBG = element['category'].replace(/\s+/g, '-').toLowerCase();
        document.getElementById('board-ticket-container-todo').innerHTML += generateTicketHTML(element, categoryBG);
    }
}

function generateTicketHTML (element, categoryBG) {
    return  `<div draggable="true" class="board-ticket">
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
            <div class="board-ticket-priority"><img src="/assets/icons-addtask/prio-${element['priority']}-color.png" alt="priority"></div>
        </div>
    </div>
</div>`
}