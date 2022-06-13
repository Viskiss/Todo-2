const FORM = document.querySelector(".form");
const INPUT_ADD = document.querySelector(".input_add");
const DROPDOWN = document.querySelector(".dropdown-content");
const UL_ACTIVE = document.querySelector(".ul_active");
const UL_COMPLETED = document.querySelector(".ul_completed");
const ACC = document.getElementsByClassName("accordion");
const UL_SET = document.querySelector(".ul_set");

const PANEL_ACTIVE = document.querySelector(".panel_active");

const LOCAL_STORAGE_ACTIVE_TODO = "active_todo";
const LOCAL_STORAGE_COMPLETED_TODO = "completed_todo";

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
    const div = document.createElement("div");

    const btn_delete = document.createElement("button");
    btn_delete.dataset.btn = "delete";
    btn_delete.dataset.todoId = todo.id;
    btn_delete.classList.add("btn_delete");

    const btn_selector = document.createElement("button");
    btn_selector.dataset.btn = "selector";
    btn_selector.dataset.todoId = todo.id;
    btn_selector.classList.add("btn_selector")

    btn_delete.textContent = "delete";
    btn_selector.textContent = "add";

    li.textContent = todo.value;
    li.dataset.todoId = todo.id;


    div.append(btn_delete, btn_selector);
    li.appendChild(div);




    if (!todo.completed && !todo.reserved) {
      UL_ACTIVE.appendChild(li);
      
     
    }

    if (todo.completed) {
      UL_COMPLETED.appendChild(li);
    }

    if (todo.reserved) {
      UL_SET.appendChild(li);
    }

    


  });
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
