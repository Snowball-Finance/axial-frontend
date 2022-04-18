export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const numberOfDaysUntilDate = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.floor(diff / (1000 * 3600 * 24));
};

export const addDaysToTodayAndGetOnlyDate = (days: number) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};
