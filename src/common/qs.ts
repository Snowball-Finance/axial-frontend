export function queryStringer(params: any): string {
  let qs = "?";
  let counter = 0;
  for (let key in params) {
    let prefix = counter === 0 ? "" : "&";
    qs += prefix + key + "=" + params[key];
    counter++;
  }
  if (counter === 0) {
    qs = "";
  }
  return qs;
}
