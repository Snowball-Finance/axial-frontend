export const stringifyScientific = (value: Number | string) => {
  if (Number(value).toString().includes("e-")) {
    return Number(value).toFixed(18);
  }
  return value.toString();
};
