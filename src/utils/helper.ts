let timeout: ReturnType<typeof setTimeout>;
// eslint-disable-next-line @typescript-eslint/ban-types
export const useDebounce = (func: Function, wait: number) => {
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
