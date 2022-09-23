import { IOutage, ISite } from "./types";
import axios from "axios";

const baseUrl = "https://api.krakenflex.systems/interview-tests-mock-api/v1";
const headers = {
  "x-api-key": process.env.API_KEY || "",
};

export const getAllOutages = async (): Promise<IOutage[]> => {
  const response = await axios.get(`${baseUrl}/outages`, {
    headers: headers,
  });
  return response.data as IOutage[];
};

export const getSiteInfo = async (siteID: string): Promise<ISite> => {
  const response = await axios.get(`${baseUrl}/site-info/${siteID}`, {
    headers,
  });
  return response.data as ISite;
};

export const sendUpdatedOutages = async (
  outages: IOutage[],
  siteID: string
): Promise<void> => {
  await axios({
    method: "POST",
    url: `${baseUrl}/site-outages/${siteID}`,
    data: JSON.stringify(outages),
    headers: { ...headers, "content-type": "application/json" },
  });
};
