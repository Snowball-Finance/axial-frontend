export const toFixed = (v: string | number, fraction = 15) => {
  let value = v.toString();
  if (isNaN(Number(value))) {
    return value;
  } else if (!value.includes(".")) {
    return value;
  }
  const splitted = value.split(".");
  if (value.includes(".") && splitted[1]) {
    return [splitted[0], ".", splitted[1].slice(0, fraction)].join("");
  }
  return value;
};
