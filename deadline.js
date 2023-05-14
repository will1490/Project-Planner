// Rest of days available for task
export function getRemainingTime(deadline) { 
    const today = new Date();
    const limit = new Date(deadline);
    const timeDiff = limit.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  }