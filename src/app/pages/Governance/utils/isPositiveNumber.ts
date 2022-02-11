export const isPositiveNumber = (v: any) => {
  if (!isNaN(Number(v))) {
    if (v) {
      return true;
    }
  }
  return false;
};
