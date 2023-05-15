import { displayTasks } from "./display.js";

export let tasks = [];

// Filter by name
const nameFilterInput = document.querySelector('#name-filter');
// Eventlistener for filter by name
nameFilterInput.addEventListener('input', displayTasks);

// Filter by status
const filterSelect = document.querySelector('#filter');
// Eventlistener for filter by status
filterSelect.addEventListener('change', displayTasks);




window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(storedTasks)
  if (storedTasks) {
    tasks = storedTasks;
    console.log(storedTasks);
    displayTasks();
  }
});

