var tasks = [
    { name: "Task 1", desc: "Sign In", status: "created" },
    { name: "Task 2", desc: "To Do List", status: "created" },
    { name: "Task 3", desc: "Cards", status: "done" },
    { name: "Task 4", desc: "Semi Final", status: "created" }
];

var currentFilter = "all";
var editIndex = -1;

var inputTask = document.querySelector(".input-task");
var inputDesc = document.querySelector(".input-desc");
var btnCreate = document.querySelector(".btn-create");
var taskList = document.querySelector(".task-list");
var tasksCount = document.querySelector(".tasks-count");
var filterBtns = document.querySelectorAll(".btn-filter");

function displayTasks() {
    var html = "";

    for (var i = 0; i < tasks.length; i++) {
        if (currentFilter == "all" || tasks[i].status == currentFilter) {
            var statusText = "Created";

            if (tasks[i].status == "done") {
                statusText = "Done";
            }
            html += '<div class="task">';
            html += '<div class="task-info">';
            html += '<p class="task-name">' + tasks[i].name + '</p>';
            html += '<p class="task-desc">' + tasks[i].desc + '</p>';
            html += '</div>';
            html += '<button class="status status-' + tasks[i].status + '">';
            html += statusText + '</button>';
            html += '<div class="actions">';
            html += '<button class="btn-done" onclick="changeStatus(' + i + ')">&#10003;</button>';
            html += '<button class="btn-edit" onclick="editTask(' + i + ')">&#9998;</button>';
            html += '<button class="btn-delete" onclick="deleteTask(' + i + ')">&#128465;</button>';
            html += '</div>';
            html += '</div>';
        }
    }
    if (html == "") {
        html = '<p class="empty-text">No tasks here</p>';
    }
    taskList.innerHTML = html;
    showCount();
}

function showCount() {
    var doneCount = 0;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].status == "done") {
            doneCount++;
        }
    }
    tasksCount.innerHTML = doneCount + "/" + tasks.length;
}

function saveTask() {
    var name = inputTask.value.trim();
    var desc = inputDesc.value.trim();

    if (name == "") {
        alert("Please enter the task name");
        return;
    }

    if (editIndex == -1) {
        var newTask = {
            name: name,
            desc: desc,
            status: "created"
        };
        tasks.push(newTask);
    } else {
        tasks[editIndex].name = name;
        tasks[editIndex].desc = desc;
        editIndex = -1;
        btnCreate.innerHTML = "Create";
    }
    inputTask.value = "";
    inputDesc.value = "";
    displayTasks();
}

function editTask(index) {
    inputTask.value = tasks[index].name;
    inputDesc.value = tasks[index].desc;
    editIndex = index;
    btnCreate.innerHTML = "Save";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    editIndex = -1;
    btnCreate.innerHTML = "Create";
    inputTask.value = "";
    inputDesc.value = "";
    displayTasks();
}

function changeStatus(index) {
    if (tasks[index].status == "done") {
        tasks[index].status = "created";
    } else {
        tasks[index].status = "done";
    }
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].classList.remove("active");
    }

    if (type == "all") {
        filterBtns[0].classList.add("active");
    } else if (type == "done") {
        filterBtns[1].classList.add("active");
    } else {
        filterBtns[2].classList.add("active");
    }
    displayTasks();
}

displayTasks();