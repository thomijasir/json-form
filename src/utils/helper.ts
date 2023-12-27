/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// make a debounce function on typescript
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
