// modules/tasks.js

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const ul = document.getElementById("taskList");
    if (!ul) return;

    ul.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <span style="text-decoration:${task.completed ? "line-through" : "none"}">
                ${task.text}
            </span>
            <div class="task-actions">
                <button class="toggle" data-i="${i}">${task.completed ? "Undo" : "Done"}</button>
                <button class="del" data-i="${i}">Delete</button>
            </div>
        `;

        ul.appendChild(li);
    });

    attachTaskButtons();
}

function attachTaskButtons() {
    document.querySelectorAll(".toggle").forEach(btn => {
        btn.onclick = () => {
            const i = +btn.dataset.i;
            const tasks = getTasks();
            tasks[i].completed = !tasks[i].completed;
            saveTasks(tasks);
            renderTasks();
            window.dispatchEvent(new Event("storage"));
        };
    });

    document.querySelectorAll(".del").forEach(btn => {
        btn.onclick = () => {
            const i = +btn.dataset.i;
            const tasks = getTasks();
            tasks.splice(i, 1);
            saveTasks(tasks);
            renderTasks();
            window.dispatchEvent(new Event("storage"));
        };
    });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("taskInput");
    const add = document.getElementById("taskAddBtn");

    if (add && input) {
        add.onclick = () => {
            const val = input.value.trim();
            if (!val) return;

            const tasks = getTasks();
            tasks.push({ text: val, completed: false });
            saveTasks(tasks);

            input.value = "";
            renderTasks();
            window.dispatchEvent(new Event("storage"));
        };
    }

    renderTasks();
});
console.log("tasks.js loaded");

const taskInput = document.getElementById("taskInput");
const taskAddBtn = document.getElementById("taskAddBtn");
const taskList = document.getElementById("taskList");

// 1. Load saved tasks
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    saved.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// 2. Add Task
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.push(text);
    localStorage.setItem("tasks", JSON.stringify(saved));

    taskInput.value = "";
    loadTasks();
}

// 3. Event listener
if (taskAddBtn) {
    taskAddBtn.addEventListener("click", addTask);
}

// 4. Run on page load
document.addEventListener("DOMContentLoaded", loadTasks);
