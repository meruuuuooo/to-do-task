
const inputFieldEl = document.getElementById("input-field");
const addBtnEl = document.getElementById("add-button");
const toDoListEl = document.getElementById("todolist-container");
const clearBtnEl = document.getElementById("clear-el");

addBtnEl.addEventListener("click", function () {
  const toDoListValue = inputFieldEl.value;
  clearInputField();
  clearToDoListEl();
  if (toDoListValue === "") {
    alert('Please input a task first before adding');
  } else {
    addTask(toDoListValue);
  }
  rendertoDoListEl();
});

document.addEventListener("DOMContentLoaded", function () {
  clearToDoListEl();
  rendertoDoListEl();
});

function rendertoDoListEl() {
  let todoList = getTodoList();

  todoList.forEach((task) => {
    const newEl = document.createElement("div");
    newEl.id = "toDoList-EL";

    const template = `
          <input id="checkbox-el" type="checkbox" />
          <input value="${task.task}" id="input-field-2" type="text" disabled>
          <button id="remove-button">
            <img class="delete-img" src="assets/icons8-delete-64.png" alt="">
          </button>
      `;

    newEl.innerHTML = template;

    const removeBtnEl = newEl.querySelector("#remove-button");

    removeBtnEl.addEventListener("click", function () {
      removeTask(task.id);
      clearToDoListEl();
      rendertoDoListEl();
    });

    const checkboxEl = newEl.querySelector("#checkbox-el");
    let isTrue = (checkboxEl.checked = task.completed);

    isCheck(isTrue, newEl);

    checkboxEl.addEventListener("change", function () {
      updateTaskStatus(task.id, (isTrue = !isTrue));
      isCheck(isTrue, newEl);
      clearToDoListEl();
      rendertoDoListEl();
    });

    toDoListEl.append(newEl);
  });

  if (getLenthOfTodoList() === 0) {
    toDoListEl.textContent = "No tasks to show";
  }

  document.getElementById("all-el").textContent = `All : ${getLenthOfTodoList()}`;
  document.getElementById("active-el").textContent = `Active : ${getActiveTasks()}`;
  document.getElementById("completed-el").textContent = `Completed : ${getCompletedTasks()}`;
}

function getTodoList() {
  const todoList = localStorage.getItem("todoList");
  return todoList ? JSON.parse(todoList) : [];
}

function addTask(task) {
  const todoList = getTodoList();
  todoList.push({ id: Date.now(), task, completed: false });
  saveTodoList(todoList);
}

function saveTodoList(todoList) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function updateTaskStatus(taskId, completed) {
  const todoList = getTodoList();
  const taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    todoList[taskIndex].completed = completed;
    saveTodoList(todoList);
    return true;
  }

  return false;
}

function removeTask(taskId) {
  const todoList = getTodoList();
  const updatedList = todoList.filter((task) => task.id !== taskId);
  saveTodoList(updatedList);
}

function removeAllTasks() {
  localStorage.removeItem("todoList");
  clearToDoListEl();
}

function getLenthOfTodoList() {
  const todoList = getTodoList();
  return todoList.length;
}

function getActiveTasks() {
  const todoList = getTodoList();
  return todoList.filter((task) => !task.completed).length;
}

function getCompletedTasks() {
  const todoList = getTodoList();
  return todoList.filter((task) => task.completed).length;
}

function clearInputField() {
  inputFieldEl.value = "";
}
function clearToDoListEl() {
  toDoListEl.innerHTML = "";
}

function isCheck(isChecked, newEl) {
  if (isChecked) {
    newEl.classList.add("checked");
  } else {
    newEl.classList.remove("checked");
  }
}
