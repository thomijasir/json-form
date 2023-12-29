export const validateUsername = (username: string) => {
  const regex = /^[a-z0-9_-]{3,16}$/;
  return regex.test(username);
};

export const validateName = (name: string) => {
  const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return regex.test(name);
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

export const validateNumberOnly = (value: string) => {
  const regex = /^\d+$/;
  return regex.test(value);
};

export const validateRequired = (value: string) => {
  return value !== '' && value !== undefined && value !== null;
};

export const validateMinimum = (min: number) => (value: string) => {
  return value.length >= min;
};

export const validateMaximum = (max: number) => (value: string) => {
  return value.length <= max;
};

export const validateCustomWithRegex =
  (regexString: string) => (value: string) => {
    const regex = new RegExp(regexString);
    return regex.test(value);
  };
