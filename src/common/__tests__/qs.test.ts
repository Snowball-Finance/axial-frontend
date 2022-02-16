import { queryStringer } from "common/qs";

describe("(utils/qs.ts)", () => {
  it("can properly convert json to queryString", () => {
    const json = {
      a: 1,
      b: 2,
    };
    const queryString = "?a=1&b=2";
    expect(queryStringer(json)).toEqual(queryString);
  });

  it("can properly convert empty json to queryString", () => {
    const json = {};
    const queryString = "";
    expect(queryStringer(json)).toEqual(queryString);
  });
});
