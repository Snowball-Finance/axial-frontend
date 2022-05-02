export const dateFormat = (inputDate: string | undefined) => {
  let validDate = "";
  if (!inputDate) {
    return validDate;
  }

  const splitDate = inputDate.split("/");
  validDate = `${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`;
  return new Date(validDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
