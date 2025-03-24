export const saveTemporaryData = (savedKey: string, data: unknown) => {
  localStorage.setItem(savedKey, JSON.stringify(data));
};

export const getTemporaryData = (savedKey: string) => {
  const item = localStorage.getItem(savedKey);
  return item ? JSON.parse(item) : null;
};
export const resetTemporaryData = (savedKey: string) => localStorage.removeItem(savedKey);
