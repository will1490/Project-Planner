import { displayTasks } from "./display.js";
import { addTask } from "./addTask.js";
import { updateClock } from "./dateAndClock.js";
import { getRemainingTime } from "./deadline.js";

export const tasks = [];

// Filter by name
const nameFilterInput = document.querySelector('#name-filter');
// Eventlistener for filter by name
nameFilterInput.addEventListener('input', displayTasks);

// Filter by status
const filterSelect = document.querySelector('#filter');
// Eventlistener for filter by status
filterSelect.addEventListener('change', displayTasks);

function init() {
  updateClock();
  addTask();
  getRemainingTime();
  displayTasks();
}

init();

window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks= JSON.parse(storedTasks);
    displayTasks();
  }
});
console.log(localStorage.getItem("tasks"));
