import { IOutage, ISite } from "./types";
import { parseISO, isBefore } from "date-fns";

export const filterOldOrIrrelevantOutages = (
  outages: IOutage[],
  siteInfo: ISite
): IOutage[] => {
  const earliestAllowedDate = parseISO(`2022-01-01T00:00:00.000Z`);
  return outages.filter((outage) => {
    if (isBefore(parseISO(outage.begin), earliestAllowedDate)) return false;

    const device = siteInfo.devices.find((device) => device.id === outage.id);
    if (!device) return false;

    outage.name = device.name;
    return true;
  });
};
