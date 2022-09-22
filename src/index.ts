import { getAllOutages, getSiteInfo } from "./endpoints";

const updateOutagesWithDeviceName = async (siteID: string) => {
  // Retrieve all outages from the GET endpoint
  const outages = await getAllOutages();

  // Retrieve the site info for norwich-pear-tree from that GET endpoint
  const siteInfo = await getSiteInfo(siteID);

  // Filter out old outages and those that aren't from the norwich-pear-tree site

  // Attach the device display name to each outage

  // Send it to the POST endpoint to update the site info

  // Notes:
  // Handle the 500 with a try catch
  // Don't forget the api key
  // Base path is https://api.krakenflex.systems/interview-tests-mock-api/v1/
};

updateOutagesWithDeviceName("norwich-pear-tree");
