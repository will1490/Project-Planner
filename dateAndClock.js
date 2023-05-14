const dateDisplay = document.querySelector('#date');
const clockDisplay = document.querySelector('#time');

// Update clock in real time
export function updateClock() {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  
    dateDisplay.textContent = now.toLocaleDateString(undefined, dateOptions);
    clockDisplay.textContent = now.toLocaleTimeString(undefined, timeOptions);
  
    setTimeout(updateClock, 1000);
  }
  // Reset clock
updateClock();
