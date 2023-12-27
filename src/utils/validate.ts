export const validateUsername = (username: string) => {
  const regex = /^[a-z0-9_-]{3,16}$/;
  return regex.test(username);
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};

export const validatePhone = (phone: string) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};
