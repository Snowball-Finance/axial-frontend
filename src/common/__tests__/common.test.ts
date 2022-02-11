import { omit } from "common/omit";

describe("(utils/common.ts)", () => {
  it("can omit a key-value", () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const result = omit("a", obj);
    expect(result).toEqual({ b: 2, c: 3 });
  });
});
