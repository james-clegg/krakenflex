import { IOutage, ISiteInfo } from "../src/types";

export const mockOutages: IOutage[] = [
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2022-07-26T17:00:31.036Z",
    end: "2022-08-29T00:37:42.253Z",
  },
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2022-05-23T12:21:27.377Z",
    end: "2022-11-13T02:16:38.905Z",
  },
];

export const mockSiteInfo: ISiteInfo = {
  id: "kingfisher",
  name: "KingFisher",
  devices: [
    {
      id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
      name: "Battery 1",
    },
    {
      id: "086b0d53-b311-4441-aaf3-935646f03d4d",
      name: "Battery 2",
    },
  ],
};

export const mockFilteredOutages: IOutage[] = [
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2022-05-23T12:21:27.377Z",
    end: "2022-11-13T02:16:38.905Z",
  },
];
