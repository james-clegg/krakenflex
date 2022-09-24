import { IOutage, ISiteInfo } from "./types";
import { parseISO, isBefore } from "date-fns";

export const filterOldOrIrrelevantOutages = (
  outages: IOutage[],
  siteInfo: ISiteInfo
): IOutage[] => {
  const earliestAllowedDate = parseISO(`2022-01-01T00:00:00.000Z`);
  return outages.filter((outage) => {
    if (isBefore(parseISO(outage.begin), earliestAllowedDate)) return false;

    const deviceWithMatchingId = siteInfo.devices.find(
      (device) => device.id === outage.id
    );
    if (!deviceWithMatchingId) return false;

    outage.name = deviceWithMatchingId.name;
    return true;
  });
};
