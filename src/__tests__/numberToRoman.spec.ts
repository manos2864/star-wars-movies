import { describe, it, expect } from "vitest";

import { numberToRoman } from "../utils/display";

describe("Test cases for numberToRoman function", () => {
  it("should convert numbers 1-10 to Roman numerals", () => {
    expect(numberToRoman(1)).toBe("I");
    expect(numberToRoman(2)).toBe("II");
    expect(numberToRoman(3)).toBe("III");
    expect(numberToRoman(4)).toBe("IV");
    expect(numberToRoman(5)).toBe("V");
    expect(numberToRoman(6)).toBe("VI");
    expect(numberToRoman(7)).toBe("VII");
    expect(numberToRoman(8)).toBe("VIII");
    expect(numberToRoman(9)).toBe("IX");
    expect(numberToRoman(10)).toBe("X");
  });

  it("should return undefined for null, 0, or negative numbers", () => {
    expect(numberToRoman(null)).toBeUndefined();
    expect(numberToRoman(0)).toBeUndefined();
    expect(numberToRoman(-1)).toBeUndefined();
  });

  it("should return undefined for numbers above 10", () => {
    expect(numberToRoman(11)).toBeUndefined();
    expect(numberToRoman(100)).toBeUndefined();
  });
});
