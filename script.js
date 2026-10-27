const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");


// Get tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display existing tasks

displayTasks();


// Add Task button event

addBtn.addEventListener("click", addTask);


// Enter key event

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Add new task

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task");

        return;
    }


    const task = {

        id: Date.now(),

        title: taskText,

        completed: false

    };


    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value = "";

}


// Display tasks

function displayTasks() {

    taskList.innerHTML = "";


    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // Task text

        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.title;


        if (task.completed) {

            span.classList.add("completed");

        }


        // Checkbox event

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Delete button

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete-btn";


        deleteBtn.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add elements to LI

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteBtn);


        // Add LI to UL

        taskList.appendChild(li);

    });

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Save tasks to Local Storage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Clear all tasks

clearBtn.addEventListener("click", function() {

    if (confirm("Are you sure you want to delete all tasks?")) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

});


// Fetch API tasks

loadBtn.addEventListener("click", function() {

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            data.forEach(function(item) {

                const task = {

                    id: Date.now() + Math.random(),

                    title: item.title,

                    completed: item.completed

                };


                tasks.push(task);

            });


            saveTasks();

            displayTasks();

        })

        .catch(function(error) {

            console.log("Error:", error);

            alert("Unable to load tasks");

        });

});