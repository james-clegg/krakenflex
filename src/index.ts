import { getAllOutages, getSiteInfo, sendUpdatedOutages } from "./endpoints";
import { filterOldOrIrrelevantOutages } from "./utils";

const handler = async (siteID: string) => {
  try {
    const outages = await getAllOutages();
    const siteInfo = await getSiteInfo(siteID);
    const filteredOutages = filterOldOrIrrelevantOutages(outages, siteInfo);
    const requestSucceeded = await sendUpdatedOutages(filteredOutages, siteID);
    requestSucceeded && console.log('Outages successfully sent.')
  } catch (e) {
    console.error("Error::", e);
  }
};

handler("norwich-pear-tree");
