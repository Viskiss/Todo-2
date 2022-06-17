const FORM = document.querySelector(".form");
const INPUT_ADD = document.querySelector(".input_add");
const DROPDOWN = document.querySelector(".dropdown-content");
const UL_ACTIVE = document.querySelector(".ul_active");
const UL_COMPLETED = document.querySelector(".ul_completed");
const ACC = document.getElementsByClassName("accordion");
const UL_SET = document.querySelector(".ul_set");
const UL = document.querySelectorAll("ul");

const PANEL_ACTIVE = document.querySelector(".panel_active");

const LOCAL_STORAGE_TODO = "todos";
// const LOCAL_STORAGE_COMPLETED_TODO = "completed_todo";
// const LOCAL_STORAGE_SET_TODO = "set_todo";

let active_todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO)) || [];

const COMPLETED_SELECTOR = "COMPLETED";
const RESERVED_SELECTOR = "RESERVED";

// let activeLists =
//   JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVE_LISTS)) || [];
// let inActiveLists =
//   JSON.parse(localStorage.getItem(LOCAL_STORAGE_INACTIVE_LISTS)) || [];

const TODOS = [];
const ACTIVE_TODOS = TODOS.filter((todo) => {
  if (!todo.completed && !todo.reserved) {
    return true;
  }
  return false;
});

FORM.addEventListener("submit", (event) => {
  event.preventDefault();
});

// UL_ACTIVE.addEventListener("click", (event) => {
//   const btnType = event.target.dataset.btn;
//   const id = event.target.dataset.todoId;

//   if (btnType === "delete"){
//     TODOS = TODOS.filter((todo) => todo.id !== id)

//   } else if (btnType === "completed"){

//     const checkItem = TODOS.find((todo) => todo.id === id)
//     TODOS = TODOS.filter((todo) => todo.id !== id)
//     UL_COMPLETED.push(checkItem)

//   } else if (btnType === "set"){

//     const checkItem = TODOS.find((todo) => todo.id === id)
//     TODOS = TODOS.filter((todo) => todo.id !== id)
//     UL_SET.push(checkItem)
//   }

// })

DROPDOWN.addEventListener("click", (event) => {
  const value = INPUT_ADD.value;
  if (value.trim() !== "") {
    const classListArray = event.target.classList;

    let todo = {};

    if (classListArray.contains("completed_add")) {
      todo = createTodo(value, COMPLETED_SELECTOR);
    }

    if (classListArray.contains("set_add")) {
      todo = createTodo(value, RESERVED_SELECTOR);
    }

    if (classListArray.contains("active_add")) {
      todo = createTodo(value);
    }

    TODOS.push(todo);
    console.log(ACTIVE_TODOS);

    INPUT_ADD.value = "";
    render();
  }
});

const createTodo = (value, selector = "") => {
  const todo = {
    value,
    id: Date.now(),
    completed: false,
    reserved: false,
  };

  switch (selector) {
    case COMPLETED_SELECTOR:
      todo.completed = true;
      break;
    case RESERVED_SELECTOR:
      todo.reserved = true;
      break;
  }

  return todo;
};

const render = () => {
  clearElement(UL_ACTIVE);
  clearElement(UL_COMPLETED);
  clearElement(UL_SET);

  TODOS.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("li");
    const div = document.createElement("div");
    div.classList.add("div");

    const btn_delete = document.createElement("button");
    btn_delete.dataset.btn = "delete";
    btn_delete.dataset.todoId = todo.id;
    btn_delete.classList.add("btn_delete", "div_btn", "delete");

    const btn_active = document.createElement("button");
    btn_active.dataset.btn = "active";
    btn_active.dataset.todoId = todo.id;
    btn_active.classList.add("btn_active", "div_btn");

    const btn_completed = document.createElement("button");
    btn_completed.dataset.btn = "completed";
    btn_completed.dataset.todoId = todo.id;
    btn_completed.classList.add("btn_completed", "div_btn");

    const btn_set = document.createElement("button");
    btn_set.dataset.btn = "set";
    btn_set.dataset.todoId = todo.id;
    btn_set.classList.add("btn_set", "div_btn");

    btn_delete.textContent = "delete";
    btn_completed.textContent = "completed";
    btn_set.textContent = "set";
    btn_active.textContent = "active";

    li.textContent = todo.value;
    li.dataset.todoId = todo.id;

    // div.append(btn_delete, btn_selector);
    // li.appendChild(div);

    if (!todo.completed && !todo.reserved) {
      UL_ACTIVE.appendChild(li);
      li.appendChild(div);
      div.append(btn_delete, btn_set, btn_completed);
    }

    if (todo.completed) {
      UL_COMPLETED.appendChild(li);
      li.appendChild(div);
      div.append(btn_delete);
    }

    if (todo.reserved) {
      UL_SET.appendChild(li);
      li.appendChild(div);
      div.append(btn_delete, btn_active, btn_completed);
    }
  });
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
