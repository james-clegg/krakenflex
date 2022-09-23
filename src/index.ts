import { getAllOutages, getSiteInfo, sendUpdatedOutages } from "./endpoints";
import { filterOldOrIrrelevantOutages } from "./utils";

export const handler = async (siteID: string): Promise<void> => {
  try {
    const outages = await getAllOutages();
    const siteInfo = await getSiteInfo(siteID);
    const filteredOutages = filterOldOrIrrelevantOutages(outages, siteInfo);
    await sendUpdatedOutages(filteredOutages, siteID);
    console.log("Outages successfully sent.");
  } catch (e) {
    console.error("Error::", e);
  }
};

handler("norwich-pear-tree");
