import { getRemainingTime } from "./deadline.js";
import { tasks } from "./script.js";

// Display the tasks
export function displayTasks() {
  const taskTable = document.querySelector('#tasks');
  const filterSelect = document.querySelector('#filter');
  const nameFilterInput = document.querySelector('#name-filter');

  taskTable.innerHTML = '';

  let filteredTasks = tasks;

  if (!Array.isArray(filteredTasks)) {
    filteredTasks = []; // Check filteredTasks is an Array
  }

  if (filterSelect.value !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === filterSelect.value);
  }

  if (nameFilterInput.value.trim() !== '') {
    const searchValue = nameFilterInput.value.trim().toLowerCase();
    filteredTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchValue));
  }
  
  filteredTasks.forEach(task => {

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const descCell = document.createElement('td');
    const deadlineCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const remainingTimeCell = document.createElement('td');
    const remainingTime = getRemainingTime(task.deadline);

    nameCell.textContent = task.name;
    descCell.textContent = task.description;
    deadlineCell.textContent = task.deadline;
    statusCell.textContent = task.status;
    remainingTimeCell.textContent = remainingTime > 0 ? `${remainingTime} days` : 'Due Today';

    if (remainingTime < 0) {
      row.classList.add('overdue');
    }

    row.appendChild(nameCell);
    row.appendChild(descCell);
    row.appendChild(deadlineCell);
    row.appendChild(statusCell);
    row.appendChild(remainingTimeCell);

    taskTable.appendChild(row);
  });
}
