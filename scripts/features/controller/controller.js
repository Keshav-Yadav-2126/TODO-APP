import taskOperations from "../services/service.js";

window.addEventListener("load", EventBinding);

function EventBinding() {
    isAlreadyLogin()
    document.querySelector(".addtask").addEventListener("click", addTask);
    document.querySelector(".completed").addEventListener("click", completedTaskFunc);
    document.querySelector(".active").addEventListener("click", activeTask);
    document.querySelector(".all").addEventListener("click", Alltasks);
    // Add the event listener to the parent container
// document.querySelector(".task-container").addEventListener("click", function(event) {
//     if (event.target && event.target.type === "checkbox") {
//         toggleCheckStatus(event);
//     }
// })

    getData();
}

function isAlreadyLogin(){
    if (localStorage.userInfo) {
        console.log("already login")
    }
    else{
        location.href = 'user.html';
    }
}

function addTask() {
    let taskValue = document.querySelector("#input").value.trim();

    if (!taskValue) {
        alert("Please enter a task!");
        return;
    }

    const editId = document.querySelector("#input").getAttribute("edit-id");

    if (editId) {
        taskOperations.update(editId, taskValue);
        document.querySelector("#input").removeAttribute("edit-id");
        console.log(`Task with ID ${editId} updated.`);
    } else {
        // Create a new task
        const taskObj = {
            id: autoIncrement(),
            taskValue: taskValue,
        };
        taskOperations.add(taskObj);
    }

    document.querySelector("#input").value = "";
    refreshTaskList();
}

function refreshTaskList() {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";

    taskOperations.getAllTasks().forEach(task => {
        if (!task.isDeleted) {
            printTask(task);
        }
    });

    saveData();
}

function printTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("tasks", "w-full" , "h-12", "flex", "items-center", "justify-between", "px-4");

    taskDiv.innerHTML = `
        <input id="checkBox" class="checkBox" type="checkbox" task-id="${task.id}" ${task.isChecked ? "checked" : ""}>
        <p class="text text-xl">${task.text}</p>
        <div class="icons">
            <i id="edit" class="cursor-pointer fa-regular fa-pen-to-square" task-id="${task.id}"></i>
            <i id="delete" class="cursor-pointer fa-solid fa-trash" task-id="${task.id}"></i>
        </div>
    `;

    const editIcon = taskDiv.querySelector('#edit');
    const deleteIcon = taskDiv.querySelector('#delete');
    const checkbox = taskDiv.querySelector('#checkBox');

    deleteIcon.addEventListener("click", deleteTask);
    editIcon.addEventListener("click", editTask);
    checkbox.addEventListener("change", toggleCheckStatus);

    document.querySelector(".task-container").appendChild(taskDiv);
}

function editTask(event) {
    const taskId = event.target.getAttribute('task-id');
    const taskObj = taskOperations.search(taskId);

    if (taskObj) {
        document.querySelector("#input").value = taskObj.text;
        document.querySelector("#input").setAttribute("edit-id", taskId);
    }
}

function deleteTask(event) {
    const taskId = event.target.getAttribute('task-id');
    taskOperations.remove(taskId);
    refreshTaskList();
    console.log(`Task with ID ${taskId} deleted.`);
}

function saveData() {
    localStorage.setItem('Alltasks', JSON.stringify(taskOperations.getAllTasks()));
    
}

function getData() {
    const data = JSON.parse(localStorage.getItem('Alltasks')) || [];
    taskOperations.loadTasks(data);
    refreshTaskList();
}

function toggleCheckStatus(event) {
    console.log("checked")
    const checkbox = event.target;
    const taskId = checkbox.getAttribute("task-id");
    taskOperations.toggleCheck(taskId);
    saveData()
    refreshTaskList()
}

function completedTaskFunc() {
    console.log("complete")
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    taskOperations.getAllTasks().forEach(task => {
        if (task.isChecked) {
            printTask(task)
        }
    });
}

function activeTask() {
    console.log("Active")
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    taskOperations.getAllTasks().forEach(task => {
        if (!task.isChecked) {
            printTask(task)
        }
    });
}

function Alltasks() {
    console.log("All Tasks .......")
    const taskContainer = document.querySelector(".task-container");
    taskContainer.innerHTML = "";
    taskOperations.getAllTasks().forEach(task => {
        printTask(task)
    });
}

function autoIncrement() {
    let count = JSON.parse(localStorage.getItem('taskCount')) || 0;
    count++;
    localStorage.setItem('taskCount', JSON.stringify(count));
    return count;
}
