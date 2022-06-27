const theme = document.getElementById("theme");
const addItem = document.querySelector("#add-item");
const appendi = document.querySelector(".list");
const btnAdd = document.querySelector("#new-todo");
const option = document.querySelector(".options");
const itemsTodo = document.querySelector("#count span");
const checked = document.querySelectorAll(".todo-check");
const drag = document.getElementById("drag");

//switch theme
theme.addEventListener("click", () => {
  document.querySelector("body").classList = [
    theme.checked ? "theme-dark" : "theme-light",
  ];
});

//add new item when press <Enter> key
addItem.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addNewItem(addItem.value);
  }
});

//create new item
function addNewItem(text) {
  let el = document.createElement("div");
  el.setAttribute("class", "list flex-row");

  el.innerHTML = ` <div class="item">
    <label for="" class="flex-row">
   <input type="checkbox" name="todo-item" class="todo-check" />
   <input 
   type="text" 
   class="text"
   value="${text}"
  />
 <span class="remove"><img src="./images/icon-cross.svg" class="cross-img"></span>
 </label>
 </div>
 `;

  appendi.after(el); //not work with appendChild why?? rem() break functionality
  option.style.display = "flex";
  addItem.value = null;
  addItem.placeholder = "Create a new todo";

  //callback function
  rem();
  count(1);
  active();
  completed();
  all();
}

//add new item on click btn <ADD>
btnAdd.addEventListener("click", () => {
  addNewItem(addItem.value);
});

//remove items
function removeItem(el) {
  el.remove();
  count(-1);
}

//locate target and remove it
function rem() {
  document.querySelector(".remove").addEventListener("click", (event) => {
    removeItem(event.target.closest("div.list"));
  });
}

//calculate number of todo-items
function count(n) {
  itemsTodo.innerHTML = +itemsTodo.innerHTML + n;
}

//delete checked todo-items
document.querySelector("#clear").addEventListener("click", () => {
  document
    .querySelectorAll('.list input[type="checkbox"]:checked')
    .forEach((item) => {
      removeItem(item.closest("div.list"));
    });
});

//display all list items
function active() {
  document.querySelector("#active").addEventListener("click", (e) => {
    document
      .querySelectorAll('.list input[type="checkbox"]')
      .forEach((item) => {
        if (item.checked == true) {
          item.closest("div.list").style.display = "none";
        } else {
          item.closest("div.list").style.display = "flex";
        }
      });
  });
}

//display checked items
function completed() {
  document.querySelector("#completed").addEventListener("click", (e) => {
    document
      .querySelectorAll('.list input[type="checkbox"]')
      .forEach((item) => {
        if (item.checked == true) {
          item.closest("div.list").style.display = "flex";
        } else {
          item.closest("div.list").style.display = "none";
        }
      });
  });
}

//display unchecked items
function all() {
  document.querySelector("#all").addEventListener("click", (e) => {
    document
      .querySelectorAll('.list input[type="checkbox"]')
      .forEach((item) => {
        item.closest("div.list").style.display = "flex";
      });
  });
}

//drag and drop
new Sortable(drag, {
  animation: 150,
  ghostClass: "blue-background-class",
});