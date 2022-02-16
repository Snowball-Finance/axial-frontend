export const nodeIsHealthy = async (url) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "health.getLiveness",
    }),
    redirect: "follow",
  };
  try {
    const response = await fetch(`${url}/ext/health`, requestOptions);
    const bodyResponse = await response.json();
    return bodyResponse.healthy;
  } catch (error) {
    console.error(error);
    return false;
  }
};
