const logout = document.querySelector(".js-logOut");
const localData = localStorage.getItem("token");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");

if (!localData) {
  location.replace("login.html");
}

logout.addEventListener("click", (evt) => {
  localStorage.removeItem("token");
  location.reload();
});

const renderTodo = (array, node) => {
  node.innerHTML = "";
  array.forEach((todo) => {
    node.innerHTML += `
    <li class="d-flex justify-content-between mb-2 ">
      <span>${todo.todo_value}</span>
      <div class="text-end">
      <button data-todo-id=${todo.id} class="btn device btn-warning todo-edit ">EDIT</button>
      <button data-todo-id=${todo.id} class="btn device btn-danger todo-delete">DELETE</button>
  </div>
    </li>
    `;
  });
  elInput.value = "";
};

async function getTodos() {
  let res = await fetch("http://192.168.1.3:5000/todo", {
    headers: {
      Authorization: localData,
    },
  });
  let data = await res.json();
  renderTodo(data, elList);
}
getTodos();

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  fetch("http://192.168.1.3:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: elInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
});

const deleteTodo = (id) => {
  fetch(`http://192.168.1.3:5000/todo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
};
const editTodo = (id) => {
  let newValue = prompt("Yangi todo kiriting");
  fetch(`http://192.168.1.3:5000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: newValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getTodos();
      }
    })
    .catch((err) => console.log(err));
};

elList.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (evt.target.matches(".todo-delete")) {
    const todoId = evt.target.dataset.todoId;
    deleteTodo(todoId);
  }
  if (evt.target.matches(".todo-edit")) {
    const todoId = evt.target.dataset.todoId;
    editTodo(todoId);
  }
});

let elModebtn = document.querySelector(".mode-btn");
let MainTxt = document.querySelector(".main");

let theme = false;

elModebtn.addEventListener("click", (evt) => {
  
  evt.preventDefault();
  theme = !theme;
  const newBBack = theme ? "dark" : "light";
  window.localStorage.setItem("theme", newBBack);
  newTheme();
});

let newTheme = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
    // document.MainTxt.classList.add("white");
  } else {
    document.body.classList.remove("dark");
    // document.MainTxt.classList.remove("white");
  }
};
newTheme();
