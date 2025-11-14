export const SORTING_KEY_ENUMS = {
  YEAR: "year",
  EPISODE: "episode",
  TOTAL_RATING: "totalRating",
} as const;

export type SORTING_KEYS =
  (typeof SORTING_KEY_ENUMS)[keyof typeof SORTING_KEY_ENUMS];
