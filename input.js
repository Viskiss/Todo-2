const FORM = document.querySelector(".form");
const INPUT_ADD = document.querySelector(".input_add");
const ACTIVE_BTN = document.querySelector(".active_add");
const COMPLETED_BTN = document.querySelector(".compled_add");
const SET_BTN = document.querySelector(".set_add");

FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = INPUT_ADD.value;
  INPUT_ADD.value = "";
});
