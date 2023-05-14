import { displayTasks } from "./display.js";
import { tasks } from "./script.js";

const taskForm = document.querySelector('#taskForm');
const taskNameInput = document.querySelector('#name');
const taskDescInput = document.querySelector('#description');
const taskDeadlineInput = document.querySelector('#deadline');
const taskStatusSelect = document.querySelector('#status');

taskForm.addEventListener('submit', addTask);

// Add a task
export function addTask(event) {
  if (event) {
    event.preventDefault();
  }

  const task = {
    name: taskNameInput.value,
    description: taskDescInput.value,
    deadline: taskDeadlineInput.value,
    status: taskStatusSelect.value 
  };

  tasks.push(task);
  taskNameInput.value = '';
  taskDescInput.value = '';
  taskDeadlineInput.value = '';
  taskStatusSelect.value ='';

  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();
  }
