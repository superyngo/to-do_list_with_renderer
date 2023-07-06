const selectElement = document.querySelector("#selectImportance");
const input = document.querySelector("input");

var todos = JSON.parse(localStorage.getItem("todoList")) ?? [
  {
    title: "倒垃圾",
    category: "normal",
    isCompleted: false,
  },
  {
    title: "繳電話費",
    category: "important",
    isCompleted: false,
  },
  {
    title: "採買本週食材",
    category: "urgent",
    isCompleted: false,
  },
];

const importanceBackgroundColor = {
  normal: "white",
  important: "orange",
  urgent: "red",
};

function render() {
  // console.log(todos);
  const root = document.querySelector("#root");
  root.textContent = "";
  const ul = document.createElement("ul");
  root.append(ul);
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const toggleBtn = document.createElement("button");
    const title = document.createElement("span");
    title.textContent = todo.title;
    title.style.backgroundColor = importanceBackgroundColor[todo.category];
    title.className = "title";
    delBtn.textContent = "刪除";
    delBtn.onclick = () => del(index);
    if (!todo.isCompleted) {
      toggleBtn.textContent = "標示為已完成";
    }
    if (todo.isCompleted) {
      toggleBtn.textContent = "標示為未完成";
      const span = document.createElement("span");
      span.textContent = "(已完成)";
      li.append(span);
    }
    toggleBtn.onclick = () => toggleDone(index);
    ul.append(li);
    li.append(delBtn, toggleBtn, title);
  });
}

function selectImportanceChange() {
  input.style.backgroundColor =
    importanceBackgroundColor[
      selectElement.options[selectElement.selectedIndex].value
    ];
}

function add() {
  todos.push({
    title: input.value,
    category: selectElement.options[selectElement.selectedIndex].value,
    isCompleted: false,
  });
  // console.log(input);
  render();
}

function del(index) {
  todos.splice(index, 1);
  render();
}

function toggleDone(index) {
  todos[index].isCompleted = !todos[index].isCompleted;
  render();
}

function exportTodos() {
  console.log("log");
  const asterisk = {
    normal: "",
    important: "*",
    urgent: "**",
  };
  const output = todos.map((todo, index) => {
    const output =
      (index + 1).toString() +
      "、" +
      asterisk[todo.category] +
      todo.title +
      (todo.isCompleted ? "(已完成)" : "") +
      asterisk[todo.category];
    return output;
  });
  alert("今日待辦：" + output.join(" "));
}

function save() {
  const saveData = JSON.stringify(todos);
  localStorage.setItem("todoList", saveData);
}

render();
