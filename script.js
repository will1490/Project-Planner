// Récupération des éléments du formulaire et de la table
const taskForm = document.querySelector('form');
const taskNameInput = document.querySelector('#name');
const taskDescInput = document.querySelector('#description');
const taskdeadlineInput = document.querySelector('#deadline');
const taskStatusSelect = document.querySelector('#status');
const filterSelect = document.querySelector('#filter');
const taskTable = document.querySelector('#tasks tbody');
const dateDisplay = document.querySelector('#date');
const clockDisplay = document.querySelector('#time');

let tasks = [];

// Ajout d'une tâche
function addTask(event) {
  event.preventDefault();

  const task = {
    name: taskNameInput.value,
    description: taskDescInput.value,
    deadline: taskdeadlineInput.value,
    status: taskStatusSelect.value
  };

  tasks.push(task);
  taskNameInput.value = '';
  taskDescInput.value = '';
  taskdeadlineInput.value = '';
  displayTasks();
  saveTasks();
}

// Affichage des tâches
function displayTasks() {
  taskTable.innerHTML = '';

  let filteredTasks = tasks;

  if (filterSelect.value !== 'all') {
    filteredTasks = tasks.filter(task => task.status === filterSelect.value);
  }

  filteredTasks.sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });

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

// Récupération du temps restant en jours
function getRemainingTime(deadline) {
  const today = new Date();
  const limit = new Date(deadline);
  const timeDiff = limit.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining;
}

// Enregistrement des tâches dans le stockage local
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Chargement des tâches depuis le stockage local
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  }
}

// Mise à jour de l'horloge en temps réel
function updateClock() {
  const now = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

  dateDisplay.textContent = now.toLocaleDateString(undefined, dateOptions);
  clockDisplay.textContent = now.toLocaleTimeString(undefined, timeOptions);

  setTimeout(updateClock, 1000);
}

// Initialisation de l'horloge
updateClock();

// Écouteur d'événement pour le formulaire
taskForm.addEventListener('submit', addTask);

// Chargement des tâches sauvegardées
loadTasks();
