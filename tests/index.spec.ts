import { handler } from "../src/index";
import * as utilsObj from "../src/utils";
import * as endpointsObj from "../src/endpoints";
import { IOutage, ISiteInfo } from "../src/types";
import { mockOutages, mockSiteInfo, mockFilteredOutages } from "./mocks";

const siteID = "norwich-pear-tree";

let getAllOutagesSpy: jest.SpyInstance;
let getSiteInfoSpy: jest.SpyInstance;
let sendUpdatedOutagesSpy: jest.SpyInstance;
let filterOldOrIrrelevantOutagesSpy: jest.SpyInstance;

describe("Handler", () => {
  beforeEach(() => {
    const mockOutagesAsUnknown = mockOutages as unknown;
    const mockSiteInfoAsUnknown = mockSiteInfo as unknown;

    getAllOutagesSpy = jest
      .spyOn(endpointsObj, "getAllOutages")
      .mockReturnValue(mockOutagesAsUnknown as Promise<IOutage[]>);

    getSiteInfoSpy = jest
      .spyOn(endpointsObj, "getSiteInfo")
      .mockReturnValue(mockSiteInfoAsUnknown as Promise<ISiteInfo>);

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
