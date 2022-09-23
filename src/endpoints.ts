import { IOutage, ISite } from "./types";
import fetch from "node-fetch";

const baseUrl = "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const headers = {
  "x-api-key": process.env.API_KEY || "",
};

export const getAllOutages = async (): Promise<IOutage[]> => {
  const response = await fetch(`${baseUrl}/outages`, {
    method: "GET",
    headers,
  });
  const data = (await response.json()) as IOutage[];
  return data;
};

export const getSiteInfo = async (siteID: string): Promise<ISite> => {
  const response = await fetch(`${baseUrl}/site-info/${siteID}`, {
    method: "GET",
    headers,
  });
  const data = (await response.json()) as ISite;
  return data;
};

export const sendUpdatedOutages = async (
  outages: IOutage[],
  siteID: string
): Promise<boolean> => {
  const response = await fetch(`${baseUrl}/site-outages/${siteID}`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify(outages),
  });
  return response.ok;
};
