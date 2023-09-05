export const formatPrice = (number) => {
  return parseFloat(number).toFixed(2);
};

export const formatDate = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);

  const difference = Math.floor((now - date) / 1000);

  if (difference < 60) {
    return 'Edited just now';
  } else if (difference < 3600) {
    const minutesAgo = Math.floor(difference / 60);
    return `Edited ${minutesAgo}m ago`;
  } else if (difference < 86400) {
    const hoursAgo = Math.floor(difference / 3600);
    return `Edited ${hoursAgo}h ago`;
  } else if (difference < 2592000) {
    const daysAgo = Math.floor(difference / 86400);
    return `Edited ${daysAgo}d ago`;
  } else if (now.getFullYear() === date.getFullYear()) {
    // Format the date to "MMM DD"
    const options = { month: 'short', day: 'numeric' };
    return `Edited ${date.toLocaleDateString(undefined, options)}`;
  } else {
    const yearDiff = now.getFullYear() - date.getFullYear();
    return `Edited ${yearDiff}y ago`;
  }
};
