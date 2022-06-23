let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// const ul = document.querySelector('ul')
// const li = document.querySelector('li')

// if (ul.contains(li) ){
//   panel.style.display = "block";
// } else {
//   panel.style.display = "none";
// }

document.querySelector(".btn_clear").onclick = function () {
  document.querySelector(".input_add").value = "";
};
