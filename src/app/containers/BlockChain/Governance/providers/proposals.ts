import { env } from "environment";

export const GetProposalsAPI = async () => {
  const response = await fetch(`${env.BASE_URL}axialproposals`, {
    method: "GET",
  });
  const res = await response.json();
  return res;
};
