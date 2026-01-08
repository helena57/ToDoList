// JavaScript/HTML Mental Model: User types -> input.value
// 								 User Clicks -> Event fires
//								 JS stores -> todos[]
//							     JS renders -> <li> elements
//								 UI updates -> user sees results

// JavaScript Selectors: "Connecting the Wires"
// Document = webpage / querySelector = "Find this element" / #id = look for element with this ID
// JS and HTML connect through this (list = <UL>, button = <button>, input = <input>)
let input = document.querySelector("#todo-input");
let button = document.querySelector("#add-btn");
let list = document.querySelector("#todo-list");
let modal = document.querySelector("#confirm-modal");
let yesBtn = document.querySelector("#confirm-yes");
let noBtn = document.querySelector("#confirm-no");

// Array is the real data
let todos = [];

// Load saved todos on page load
let savedTodos = localStorage.getItem("todos");
if (savedTodos) {
	todos = JSON.parse(savedTodos);
	renderTodos();
}

function saveTodos() {
	localStorage.setItem("todos", JSON.stringify(todos));
}
// Rebuilds the entire list from the array (source of truth)
// This keeps UI and data in sync
function renderTodos() {
	list.innerHTML = "";
	if (clearBtn) {
		clearBtn.disabled = todos.length === 0;
	}
//Flow: 1. Create Element 2. Put Text Inside 3. Attach it to the page
	for (let i = 0; i < todos.length; i++) {
		let li = document.createElement("li");
		li.textContent = todos[i];
		
		let deleteBtn = document.createElement("button");
		deleteBtn.textContent = "X";
		
		deleteBtn.addEventListener("click", function () {
			// i = position in array, so each list item knows which array item it belongs to.
			todos.splice(i, 1);
			saveTodos();
			renderTodos();
		});
		
		li.appendChild(deleteBtn);
		list.appendChild(li);
	}
}

// Clear All Function
function clearTodos() {
	modal.classList.remove("hidden");
}

yesBtn.addEventListener("click", function () {
	todos = [];
	localStorage.removeItem("todos");
	renderTodos();
    modal.classList.add("hidden");
});

noBtn.addEventListener("click", function () {
	modal.classList.add("hidden");
});

// Click Handler
// The event listener: This block means When the user clicks the button, run this code.

function addTodo() {
	// Guard Clause: If the input is empty, stop everything.
	if (input.value.trim() === "") return;
		
//This line means take what the user typed and store it.""
  	todos.push(input.value);
    saveTodos();
	renderTodos();
    input.value = "";
}

button.addEventListener("click", addTodo);

input.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		addTodo();
	}
});
	
clearBtn.addEventListener("click", clearTodos);

