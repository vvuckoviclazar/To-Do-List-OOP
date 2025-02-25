"use strict";

const addButton = document.querySelector(".addBtn");
const input = document.querySelector(".input");
const taskList = document.querySelector(".taskList");
const form = document.querySelector("form");
const submitDiv = document.querySelector(".submitDiv");

let inputValue = "";

class Todo {
  constructor(text) {
    this.id = crypto.randomUUID();
    this.text = text;
    this.isChecked = false;
  }

  getId() {
    return this.id;
  }

  getText() {
    return this.text;
  }

  switchIsChecked() {
    this.isChecked = !this.isChecked;
    return this.isChecked;
  }

  getIsChecked() {
    return this.isChecked;
  }
}

class TodoManager {
  constructor() {
    this.taskData = [];
  }

  addTask(task) {
    this.taskData.push(task);
  }

  setTasks(tasks) {
    this.taskData = tasks;
  }

  getTasks() {
    return this.taskData;
  }

  removeTask(id) {
    const updatedTasks = this.getTasks().filter((task) => task.getId() !== id);
    this.setTasks(updatedTasks);
  }

  toggleTaskState(taskId, taskElement) {
    const task = this.getTasks().find((task) => task.getId() === taskId);
    if (!task) return;
    task.switchIsChecked();
    task.getIsChecked()
      ? taskElement.classList.add("crossed")
      : taskElement.classList.remove("crossed");
  }
}

class TodoApp {
  constructor() {
    this.manager = new TodoManager();
  }

  createTaskElement(id, text) {
    const li = document.createElement("li");
    li.id = id;
    li.classList.add("li");
    li.innerHTML = `${text} <div class="checkDiv">
      <button class="checkBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="check">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class="removeBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="trash">
          <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`;
    return li;
  }

  bindTaskEvents(taskElement) {
    const removeBtn = taskElement.querySelector(".removeBtn");
    const checkBtn = taskElement.querySelector(".checkBtn");

    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      taskElement.remove();
      const taskId = taskElement.id;
      this.manager.removeTask(taskId);
    });

    checkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.manager.toggleTaskState(taskElement.id, taskElement);
    });
  }

  renderTasks() {
    taskList.innerHTML = "";
    this.manager.getTasks().forEach((task) => {
      const taskElement = this.createTaskElement(task.getId(), task.getText());
      taskList.appendChild(taskElement);
      this.bindTaskEvents(taskElement);
    });
  }

  addTask(task) {
    this.manager.addTask(task);
    this.renderTasks();
  }
}

const app = new TodoApp();

input.addEventListener("input", (e) => {
  inputValue = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }
  const taskText = inputValue;
  const task = new Todo(taskText);
  app.addTask(task);
  input.value = "";
});
