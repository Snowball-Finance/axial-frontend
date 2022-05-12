import { env } from "environment";

export const GetSAxialDataAPI = async () => {
  const response = await fetch(`${env.BASE_URL}saxialdata`, {
    method: "GET",
  });
  const res = await response.json();
  return res;
};
