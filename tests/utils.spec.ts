import { IOutage } from "../src/types";
import { filterOldOrIrrelevantOutages } from "../src/utils";

describe("filterOldOrIrrelevantOutages", () => {
  const siteInfo = {
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

  it("Should return an empty array when passed an empty array", () => {
    const expected: IOutage[] = [];
    const actual = filterOldOrIrrelevantOutages([], siteInfo);
    expect(actual).toEqual(expected);
  });

  it("Should filter out outages that are too old", () => {
    const expected = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-07-26T17:09:31.036Z",
        end: "2021-08-29T00:37:42.253Z",
        name: "Battery 1",
      },
    ];
    const actual = filterOldOrIrrelevantOutages(
      [
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          begin: "2022-07-26T17:09:31.036Z",
          end: "2021-08-29T00:37:42.253Z",
        },
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          begin: "2021-07-26T17:09:31.036Z",
          end: "2021-08-29T00:37:42.253Z",
        },
      ],
      siteInfo
    );
    expect(actual).toEqual(expected);
  });

  it("Should filter out outages that do not have a matching device id", () => {
    const expected = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-07-26T17:09:31.036Z",
        end: "2021-08-29T00:37:42.253Z",
        name: "Battery 1",
      },
    ];
    const actual = filterOldOrIrrelevantOutages(
      [
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          begin: "2022-07-26T17:09:31.036Z",
          end: "2021-08-29T00:37:42.253Z",
        },
        {
          id: "test",
          begin: "2021-07-26T17:09:31.036Z",
          end: "2021-08-29T00:37:42.253Z",
        },
      ],
      siteInfo
    );
    expect(actual).toEqual(expected);
  });

  it("Should return an array of outages that meet the critera", () => {
    const expected = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-07-26T17:09:31.036Z",
        end: "2021-08-29T00:37:42.253Z",
        name: "Battery 1",
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-05-23T12:21:27.377Z",
        end: "2022-11-13T02:16:38.905Z",
        name: "Battery 1",
      },
    ];
    const actual = filterOldOrIrrelevantOutages(
      [
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          begin: "2022-07-26T17:09:31.036Z",
          end: "2021-08-29T00:37:42.253Z",
        },
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          begin: "2022-05-23T12:21:27.377Z",
          end: "2022-11-13T02:16:38.905Z",
        },
      ],
      siteInfo
    );
    expect(actual).toEqual(expected);
  });
});
