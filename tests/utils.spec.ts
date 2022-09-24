import { IOutage } from "../src/types";
import { filterOldOrIrrelevantOutages } from "../src/utils";
import { mockSiteInfo, mockOutages } from "./mocks";

describe("filterOldOrIrrelevantOutages", () => {
  it("Should return an empty array when passed an empty array", () => {
    const expected: IOutage[] = [];
    const actual = filterOldOrIrrelevantOutages([], mockSiteInfo);
    expect(actual).toEqual(expected);
  });

  it("Should filter out outages that are too old", () => {
    const expected = mockOutages;
    const outageTooOld: IOutage = {
      id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
      begin: "2021-07-26T17:00:31.036Z",
      end: "2022-08-29T00:37:42.253Z",
    };
    const actual = filterOldOrIrrelevantOutages(
      [...mockOutages, outageTooOld],
      mockSiteInfo
    );
    expect(actual).toEqual(expected);
  });

  it("Should filter out outages that do not have a matching device id", () => {
    const expected = mockOutages;
    const outageNoMatchingID: IOutage = {
      id: "Test",
      begin: "2022-07-26T17:00:31.036Z",
      end: "2022-08-29T00:37:42.253Z",
    };
    const actual = filterOldOrIrrelevantOutages(
      [...mockOutages, outageNoMatchingID],
      mockSiteInfo
    );
    expect(actual).toEqual(expected);
  });

  it("Should return an array of outages that meet the critera", () => {
    const expected = mockOutages;
    const actual = filterOldOrIrrelevantOutages(mockOutages, mockSiteInfo);
    expect(actual).toEqual(expected);
  });
});
