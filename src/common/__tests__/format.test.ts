import { formatAPY, formatPercent, formatNumber } from "common/format";

describe("(utils/format.ts)", () => {
  it("should formats decimal to percent", () => {
    const decimal = 0.01;
    const percent = formatPercent(decimal);
    expect(percent).toBe("1.00");
  });

  it("should formats APY", () => {
    const v = 123.456;
    const formatted = "123.46%";
    expect(formatAPY(v)).toBe(formatted);
  });

  it("should format number", () => {
    const number = 123456;
    const expected = "123,456.00";
    expect(formatNumber(number, 2)).toBe(expected);
  });

  it("should format number with precision", () => {
    const number = 123456.789;
    const expected = "123,456.79";
    expect(formatNumber(number, 2)).toBe(expected);
  });

  it("should format exponential", () => {
    const number = 1000000000;
    const expected = "1.00000e+9";
    expect(formatNumber(number, 1, true)).toBe(expected);
  });

  it("should format exponential with precision", () => {
    const number = 1000000000.123;
    const expected = "1.00000e+9";
    expect(formatNumber(number, 3, true)).toBe(expected);
  });
});
