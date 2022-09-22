import { IOutage, ISite } from "./types";

const baseUrl = "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const headers = {
  "x-api-key": process.env.API_KEY || "",
};

export const getAllOutages = async (): Promise<IOutage[]> => {
  const response = await fetch(`${baseUrl}/outages`, {
    method: "GET",
    headers,
  });
  return response.json();
};

export const getSiteInfo = async (siteID: string): Promise<ISite> => {
  const response = await fetch(`${baseUrl}/site-info/${siteID}`, {
    method: "GET",
    headers,
  });
  return response.json();
};

export const sendUpdatedOutages = async (
  siteID: string,
  outages: IOutage[]
): Promise<void> => {
  await fetch(`${baseUrl}/site-outages/${siteID}`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
  });
};
