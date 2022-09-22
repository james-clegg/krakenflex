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
});
