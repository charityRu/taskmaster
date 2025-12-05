// modules/tasks-page.js
function getTasks(){ return JSON.parse(localStorage.getItem("tasks")) || []; }
function saveTasks(t){ localStorage.setItem("tasks", JSON.stringify(t)); }

function renderTasks() {
  const ul = document.getElementById("taskList");
  if (!ul) return;
  ul.innerHTML = "";
  const tasks = getTasks();
  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <span style="text-decoration:${task.completed ? "line-through" : "none"}">${task.text}</span>
      <div class="task-actions">
        <button class="toggle" data-i="${idx}">${task.completed ? "Undo" : "Done"}</button>
        <button class="del" data-i="${idx}">Delete</button>
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
      window.dispatchEvent(new Event("storage")); // notify dashboard to update stats
    };
  });
  document.querySelectorAll(".del").forEach(btn => {
    btn.onclick = () => {
      const i = +btn.dataset.i;
      const tasks = getTasks();
      tasks.splice(i,1);
      saveTasks(tasks);
      renderTasks();
      window.dispatchEvent(new Event("storage"));
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const add = document.getElementById("taskAddBtn");
  const input = document.getElementById("taskInput");
  if (add && input) {
    add.onclick = () => {
      const v = input.value.trim();
      if (!v) return;
      const tasks = getTasks();
      tasks.push({ text: v, completed: false });
      saveTasks(tasks);
      input.value = "";
      renderTasks();
      window.dispatchEvent(new Event("storage"));
    };
  }
  renderTasks();
});
