export const formatPrice = (number) => {
  return parseFloat(number).toFixed(2);
};

export const formatDate = (date) => {
  return date.split(',')[0].trim();
};
