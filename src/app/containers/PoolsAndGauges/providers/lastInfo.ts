import { env } from "environment";

export const getLastInfoAPI = async () => {
  const data = await fetch(`${env.BASE_URL}pools`, {
    method: "GET",
  });
  const res = await data.json();
  return res;
};
