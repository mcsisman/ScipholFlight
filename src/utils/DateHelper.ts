export const convertDateToYYMMDD = (date: Date) => {
  return date.toISOString().split('T')[0];
};
