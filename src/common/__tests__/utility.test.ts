import { isEmpty } from "common/utility";

describe("utils/utility.ts", () => {
  describe("identify empty values", () => {
    it("should identify undefined", () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it("should identify null", () => {
      expect(isEmpty(null)).toBe(true);
    });

    it("should identify empty string", () => {
      expect(isEmpty("")).toBe(true);
    });

    it("should identify empty array", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should identify empty object", () => {
      expect(isEmpty({})).toBe(true);
    });

    it("should identify non-empty string", () => {
      expect(isEmpty("hello")).toBe(false);
    });

    it("should identify non-empty array", () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });
  });
});
