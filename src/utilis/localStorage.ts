export const getFromStorage = (key: string) => {
  const reqKey: any = localStorage.getItem(key) || sessionStorage.getItem(key);
  const data = JSON.parse(reqKey);
  return !!data && data;
};

export const saveToStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(key, value);
};

export const clearStorage = () => localStorage.clear();

export const removeFromStorage = (key: string) => localStorage.removeItem(key);
