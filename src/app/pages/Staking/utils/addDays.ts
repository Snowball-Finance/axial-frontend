export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addDaysToTodayAndGetOnlyDate = (days: number) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};
