import { handler } from "../src/index";
import * as utilsObj from "../src/utils";
import * as endpointsObj from "../src/endpoints";
import { IOutage, ISite } from "../src/types";

const siteID = "norwich-pear-tree";

const mockOutages: IOutage[] = [
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2021-07-26T17:09:31.036Z",
    end: "2021-08-29T00:37:42.253Z",
  },
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2022-05-23T12:21:27.377Z",
    end: "2022-11-13T02:16:38.905Z",
  },
];

const mockSiteInfo: ISite = {
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

const mockFilteredOutages: IOutage[] = [
  {
    id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
    begin: "2022-05-23T12:21:27.377Z",
    end: "2022-11-13T02:16:38.905Z",
  },
];

let getAllOutagesSpy: jest.SpyInstance;
let getSiteInfoSpy: jest.SpyInstance;
let sendUpdatedOutagesSpy: jest.SpyInstance;
let filterOldOrIrrelevantOutagesSpy: jest.SpyInstance;

describe("Handler", () => {
  beforeEach(() => {
    const outagesUnknownMock: unknown = mockOutages;
    getAllOutagesSpy = jest
      .spyOn(endpointsObj, "getAllOutages")
      .mockReturnValue(outagesUnknownMock as Promise<IOutage[]>);

    const siteInfoUnknownMock: unknown = mockSiteInfo;
    getSiteInfoSpy = jest
      .spyOn(endpointsObj, "getSiteInfo")
      .mockReturnValue(siteInfoUnknownMock as Promise<ISite>);

    filterOldOrIrrelevantOutagesSpy = jest
      .spyOn(utilsObj, "filterOldOrIrrelevantOutages")
      .mockReturnValue(mockFilteredOutages);

    sendUpdatedOutagesSpy = jest
      .spyOn(endpointsObj, "sendUpdatedOutages")
      .mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should log that the program ran successfully when it does not encounter an error", async () => {
    console.log = jest.fn();
    await handler(siteID);
    expect(getAllOutagesSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledWith(siteID);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledTimes(1);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledWith(
      mockOutages,
      mockSiteInfo
    );
    expect(sendUpdatedOutagesSpy).toBeCalledTimes(1);
    expect(sendUpdatedOutagesSpy).toBeCalledWith(mockFilteredOutages, siteID);
    expect(console.log).toBeCalledWith("Outages successfully sent.");
  });

  it("Should catch the error if getOutages throws one", async () => {
    console.error = jest.fn();
    const getAllOutagesRejectionSpy = jest
      .spyOn(endpointsObj, "getAllOutages")
      .mockRejectedValue({
        response: { status: 500, data: { message: "internal server error" } },
      });
    await handler(siteID);
    expect(getAllOutagesRejectionSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledTimes(0);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledTimes(0);
    expect(sendUpdatedOutagesSpy).toBeCalledTimes(0);
    expect(console.error).toBeCalledWith("Error::", {
      response: { data: { message: "internal server error" }, status: 500 },
    });
  });

  it("Should catch the error if getSiteInfo throws one", async () => {
    console.error = jest.fn();
    const getSiteInfoRejectionSpy = jest
      .spyOn(endpointsObj, "getSiteInfo")
      .mockRejectedValue({
        response: { status: 500, data: { message: "internal server error" } },
      });
    await handler(siteID);
    expect(getAllOutagesSpy).toBeCalledTimes(1);
    expect(getSiteInfoRejectionSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledWith(siteID);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledTimes(0);
    expect(sendUpdatedOutagesSpy).toBeCalledTimes(0);
    expect(console.error).toBeCalledWith("Error::", {
      response: { data: { message: "internal server error" }, status: 500 },
    });
  });

  it("Should catch the error if sendUpdatedOutages throws one", async () => {
    console.error = jest.fn();
    const sendUpdatedOutagesRejectionSpy = jest
      .spyOn(endpointsObj, "sendUpdatedOutages")
      .mockRejectedValue({
        response: { status: 500, data: { message: "internal server error" } },
      });
    await handler(siteID);
    expect(getAllOutagesSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledTimes(1);
    expect(getSiteInfoSpy).toBeCalledWith(siteID);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledTimes(1);
    expect(filterOldOrIrrelevantOutagesSpy).toBeCalledWith(
      mockOutages,
      mockSiteInfo
    );
    expect(sendUpdatedOutagesRejectionSpy).toBeCalledTimes(1);
    expect(sendUpdatedOutagesRejectionSpy).toBeCalledWith(
      mockFilteredOutages,
      siteID
    );
    expect(console.error).toBeCalledWith("Error::", {
      response: { data: { message: "internal server error" }, status: 500 },
    });
  });
});
