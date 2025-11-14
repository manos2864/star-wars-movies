import { describe, it, expect } from "vitest";
import {
  calculateAverageRating,
  normalizeRating,
  ratingToPercentage,
} from "../pages/home/helpers";

describe("Test cases for normalizeRating function", () => {
  it("should normalize IMDB rating correctly", () => {
    const rating = { Source: "Internet Movie Database", Value: "7.6/10" };
    expect(normalizeRating(rating)).toBeCloseTo(7.6);
  });

  it("should normalize Rotten Tomatoes rating correctly", () => {
    const rating = { Source: "Rotten Tomatoes", Value: "92%" };
    expect(normalizeRating(rating)).toBeCloseTo(9.2);
  });

  it("should normalize Metacritic rating correctly", () => {
    const rating = { Source: "Metacritic", Value: "78/100" };
    expect(normalizeRating(rating)).toBeCloseTo(7.8);
  });

  it("should return NaN for unknown source", () => {
    const rating = { Source: "Unknown", Value: "50" };
    expect(isNaN(normalizeRating(rating))).toBe(true);
  });
});

describe("Test cases for calculateAverageRating function", () => {
  it("should calculate average rating correctly", () => {
    const ratings = [
      { Source: "Internet Movie Database", Value: "7.6/10" },
      { Source: "Rotten Tomatoes", Value: "92%" },
      { Source: "Metacritic", Value: "78/100" },
    ];
    const avg = calculateAverageRating(ratings);
    expect(avg).toBeCloseTo((7.6 + 9.2 + 7.8) / 3);
  });

  it("should ignore unknown/NaN ratings", () => {
    const ratings = [
      { Source: "Internet Movie Database", Value: "7.6/10" },
      { Source: "Unknown", Value: "abc" },
      { Source: "Metacritic", Value: "78/100" },
    ];
    const avg = calculateAverageRating(ratings);
    // Average of 7.6 and 7.8
    expect(avg).toBeCloseTo((7.6 + 7.8) / 2);
  });

  it("should return 0 for empty array", () => {
    expect(calculateAverageRating([])).toBe(0);
  });

  it("should return 0 for undefined or null input", () => {
    expect(calculateAverageRating(undefined as any)).toBe(0);
    expect(calculateAverageRating(null as any)).toBe(0);
  });

  it("should handle array with only unknown ratings", () => {
    const ratings = [
      { Source: "Unknown1", Value: "50" },
      { Source: "Unknown2", Value: "abc" },
    ];
    const avg = calculateAverageRating(ratings);
    expect(avg).toBe(0);
  });
});

describe("Test cases for ratingToPercentage function", () => {
  it("converts IMDb rating to percentage", () => {
    const rating = { Source: "Internet Movie Database", Value: "7/10" };
    expect(ratingToPercentage(rating)).toBe("70%");
  });

  it("converts Rotten Tomatoes rating to percentage", () => {
    const rating = { Source: "Rotten Tomatoes", Value: "85%" };
    expect(ratingToPercentage(rating)).toBe("85%");
  });

  it("converts Metacritic rating to percentage", () => {
    const rating = { Source: "Metacritic", Value: "70/100" };
    expect(ratingToPercentage(rating)).toBe("70%");
  });

  it("returns null for unknown source", () => {
    const rating = { Source: "SomeOtherSource", Value: "50/100" };
    expect(ratingToPercentage(rating)).toBeNull();
  });

  it("handles decimal values correctly", () => {
    const rating = { Source: "Internet Movie Database", Value: "7.5/10" };
    expect(ratingToPercentage(rating)).toBe("75%");
  });
});
