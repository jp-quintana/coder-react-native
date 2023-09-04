export const validateEmail = (input) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return regex.test(input);
};

export const validatePassword = (input) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}/;

  return regex.test(input);
};
