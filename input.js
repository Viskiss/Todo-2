const FORM = document.querySelector(".form");
const INPUT_ADD = document.querySelector(".input_add");
const DROPDOWN = document.querySelector(".dropdown-content");
const UL_ACTIVE = document.querySelector(".ul_active");
const UL_COMPLETED = document.querySelector(".ul_completed");
const UL_SET = document.querySelector(".ul_set");

// const INPUT = document.querySelector(".input")
const UL = document.querySelectorAll(".ul_active .ul_completed .ul_set");

const LOCAL_STORAGE_TODO = "todos";

let TODOS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO)) || [];

function save() {
  localStorage.setItem(LOCAL_STORAGE_TODO, JSON.stringify(TODOS));
}

const COMPLETED_SELECTOR = "COMPLETED";
const RESERVED_SELECTOR = "RESERVED";

const PANEL = document.querySelectorAll(".panel_A .panel_C .panel_S");
if (TODOS.lenght > 0) {
  PANEL.style.display = "block";
} else if (TODOS.lenght === 0) {
  PANEL.style.display = "none";
}

const ACTIVE_TODOS = TODOS.filter((todo) => {
  if (!todo.completed && !todo.reserved) {
    return true;
  }
  return false;
});

FORM.addEventListener("submit", (event) => {
  event.preventDefault();
});

UL_ACTIVE.addEventListener("click", (event) => {
  const btnType = event.target.dataset.btn;
  const id = event.target.dataset.todoId;
  const input = document.querySelector(`input[data-todo-id="${id}"]`);
  console.log(input);
  if (btnType === "set") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.reserved = true;
    render();
  } else if (btnType === "completed") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.completed = true;
    render();
  } else if (btnType === "delete") {
    newtodo = TODOS.filter((todo) => todo.id !== id);
    TODOS = newtodo;
    console.log(newtodo);
    render();
  } else if (btnType === "save") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.value = input.value;
    console.log(newtodo);
    render();
  }
  save();
});

UL_COMPLETED.addEventListener("click", (event) => {
  const btnType = event.target.dataset.btn;
  const id = event.target.dataset.todoId;
  const input = document.querySelector(".input");
  if (btnType === "delete") {
    newtodo = TODOS.filter((todo) => todo.id !== id);
    TODOS = newtodo;
    console.log(newtodo);
    render();
    save();
  } else if (btnType === "save") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.value = input.value;
    render();
    save();
  }
});

UL_SET.addEventListener("click", (event) => {
  const btnType = event.target.dataset.btn;
  const id = event.target.dataset.todoId;
  const input = document.querySelector(`input[data-todo-id="${id}"]`);
  if (btnType === "active") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.reserved = false;
    newtodo.completed = false;
    render();
  } else if (btnType === "completed") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.completed = true;
    newtodo.reserved = false;
    render();
  } else if (btnType === "delete") {
    newtodo = TODOS.filter((todo) => todo.id !== id);
    TODOS = newtodo;
    console.log(newtodo);
    render();
  } else if (btnType === "save") {
    newtodo = TODOS.find((todo) => todo.id === id);
    newtodo.value = input.value;
    console.log(newtodo);
    render();

    save();
  }
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
    save();

    INPUT_ADD.value = "";
    render();
  }
});

// function TodoEdit(li, id, todo) {
//   const input = document.querySelector(".input");
//   li.classList.add("edit");
//   li.appendChild(input);
//   input.value = textContent = todo.value;
//   input.focus();
//   input.setAttribute("spellcheck", false);
//   input.addEventListener("blur", (event) => {
//     if (input.getAttribute("flag") !== "1") {
//       EditDone(li, todo, input, id);
//     }
//   });

//   input.addEventListener("keydown", (event) => {
//     input.setAttribute("flag", "1");
//     if (event.keyCode === 13) {
//       EditDone(li.todo, input, id);
//     } else if (event.keyCode === 27) {
//       li.classList.remove("edit");
//       li.removeChild(input);
//       save();
//       render();
//     }
//     console.log(input);
//     input.removeAttribute("flag");
//   });
// }

// function EditDone(li, todo, input, id) {
//   if (input.value.trim() === "") {
//     TODOS = TODOS.filter((todo) => todo.id !== id);
//   }

//   li.classList.remove("edit");
//   todo.value = input.value.trim();
//   li.removeChild(input);
//   save();
//   render();
// }

const createTodo = (value, selector = "") => {
  const todo = {
    value,
    id: Date.now().toString(),
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
    const input = document.createElement("input");
    input.classList.add("input");

    const btn_delete = document.createElement("button");
    btn_delete.dataset.btn = "delete";
    btn_delete.dataset.todoId = todo.id;
    btn_delete.dataset.title = "no recovery";
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

    const bnt_save = document.createElement("button");
    bnt_save.dataset.btn = "save";
    bnt_save.dataset.todoId = todo.id;
    bnt_save.classList.add("btn_save", "div_btn");

    btn_delete.textContent = "delete";
    btn_completed.textContent = "completed";
    btn_set.textContent = "set";
    btn_active.textContent = "active";
    bnt_save.textContent = "save";

    // li.textContent = todo.value;
    li.dataset.todoId = todo.id;
    input.dataset.todoId = todo.id;
    input.value = todo.value;
    // input.setAttribute("readonly", true);

    // div.append(btn_delete, btn_selector);
    // li.appendChild(div);

    if (!todo.completed && !todo.reserved) {
      UL_ACTIVE.appendChild(li);
      li.appendChild(input);
      UL_ACTIVE.appendChild(div);
      div.append(bnt_save, btn_delete, btn_set, btn_completed);
    }

    if (todo.completed) {
      UL_COMPLETED.appendChild(li);
      li.appendChild(input);
      UL_COMPLETED.appendChild(div);
      div.append(bnt_save, btn_delete);
    }

    if (todo.reserved) {
      UL_SET.appendChild(li);
      li.appendChild(input);
      UL_SET.appendChild(div);
      div.append(bnt_save, btn_delete, btn_active, btn_completed);
    }
  });
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

document.querySelector(".btn_clear").onclick = function () {
  document.querySelector(".input_add").value = "";
};

render();
