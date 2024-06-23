const body = document.querySelector("body");
let bg = document.createElement("div");
let taskContainer = document.createElement("div")


function prepareTask() {
    bg.classList.add("task-bg", "task-bg-low-index", "flex-center");
    body.appendChild(bg);
    taskContainer.classList.add("task-container", "flex-column", "task-container-hidden",);
    bg.appendChild(taskContainer);

}

function showTask(id) {
    taskContainer.innerHTML = renderTask(id);
    bg.classList.toggle("task-bg-active");
    bg.classList.toggle("task-bg-low-index");
    taskContainer.classList.remove("task-container-hidden");
    body.classList.toggle("overflow-hidden");


    bg.addEventListener('click', function (event) {
        if (event.target == this) {
            closeTask();
        }
    });

}


function closeTask() {
    taskContainer.classList.add("task-container-hidden");
    bg.classList.remove("task-bg-active");
    body.classList.remove("overflow-hidden");
    bg.classList.add("task-bg-low-index");
}

function getActualTask(id) {
    let task = tasksArray.find((e) => e['id'] == id);
    console.log(task)
    return task;
}



function renderTaskOwners(task) {
    let taskOwnerHtml = "";
    if (task.assigned_to) {


        task.assigned_to.forEach(element => {
            getInitials(element);
            taskOwnerHtml += /*html*/ `
        <div class="task-contact-container flex task-font-small">
        <div class="task-contact-icon flex-center">${getInitials(element)}</div>
        <div class="task-contact-name">${element}</div>
        </div>`
        });
        return ` <div class="task-assigned-area flex-column">
                <div class="task-prio-key task-font-regular">Assigned To:</div>
                ${taskOwnerHtml} </div></div>`
    }
};

function renderTodos(task) {
    let taskTodoHtml = "";
    if (task.subtasks) {
        task.subtasks.forEach(element => {
            getInitials(element);
            taskTodoHtml += /*html*/ `
        <div class="flex">
                    <div class="task-subtask-container flex">
                        <input type="checkbox" checked>
                        <div class="task-todo-value">${element}</div>
                    </div>
                </div>`
        });
        return `  <div class="task-subtasks-area flex-column">
                <div class="task-prio-key task-font-regular">Subtasks</div>
                ${taskTodoHtml} </div></div>`
    }
};

function renderTask(id) {
    let task = getActualTask(id);
    renderTaskOwners(task);
    return /*html*/`<div class="task-eyebrow-container">
                <div class="board-ticket-gategory technical-task-bg">${task.category}</div>
                <div onclick="closeTask()" class="task-close-container flex-center"><img src="../assets/icons/close.svg" alt=""
                        class="task-close"></div>
            </div>
            <div class="task-heading">${task.title}</div>
            <div class="task-description task-font-regular">${task.description}</div>
            <div class="task-date-container task-font-regular flex">
                <div class="task-date-key">Due date:</div>
                <div class="task-date-value">${task.due_date}</div>
            </div>
            <div class="task-prio-container flex task-font-regular ">
                <div class="task-prio-key">Priority:</div>
                <div class="task-prio-value flex-center">${task.priority}<img
                        src="../assets/icons-addtask/prio-high-color.png" alt=""></div>
            </div>
            ${renderTaskOwners(task)}
            ${renderTodos(task)}
            
            <div class="task-footer flex">
                <div class="task-delete-container flex">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="red" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z"
                            fill="#2A3647" />
                    </svg>
                    Delete
                </div>
                <div class="task-footer-divider"></div>
                <div class="task-edit-container flex">
                    <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.16667 22.3332H5.03333L16.5333 10.8332L14.6667 8.9665L3.16667 20.4665V22.3332ZM22.2333 8.89984L16.5667 3.29984L18.4333 1.43317C18.9444 0.922059 19.5722 0.666504 20.3167 0.666504C21.0611 0.666504 21.6889 0.922059 22.2 1.43317L24.0667 3.29984C24.5778 3.81095 24.8444 4.42761 24.8667 5.14984C24.8889 5.87206 24.6444 6.48873 24.1333 6.99984L22.2333 8.89984ZM20.3 10.8665L6.16667 24.9998H0.5V19.3332L14.6333 5.19984L20.3 10.8665Z"
                            fill="rgb(42, 54, 71)" />
                    </svg>
                    Edit
                </div>
            </div>`
}