import { Ratings } from "@/entities/omd";

export const normalizeRating = (rating: {
  Source: string;
  Value: string;
}): number => {
  const { Source, Value } = rating;

  switch (Source) {
    case "Internet Movie Database":
      return parseFloat(Value.split("/")[0]);
    case "Rotten Tomatoes":
      return parseFloat(Value.replace("%", "")) / 10;
    case "Metacritic":
      return parseFloat(Value.split("/")[0]) / 10;
    default:
      return NaN;
  }
};

export const getTotalRating = (ratings?: Ratings[]) => {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings
    .map((r) => normalizeRating(r))
    .filter((val) => !isNaN(val))
    .reduce((sum, val) => sum + val, 0);

  return total;
};

export const ratingToPercentage = (rating: {
  Source: string;
  Value: string;
}): string | null => {
  const { Source, Value } = rating;

  switch (Source) {
    case "Internet Movie Database": {
      const output =
        (parseFloat(Value.split("/")[0]) / parseFloat(Value.split("/")[1])) *
        100;

      return `${output.toFixed(0)}%`;
    }
    case "Rotten Tomatoes": {
      return `${parseFloat(Value.replace("%", ""))}%`;
    }
    case "Metacritic": {
      const output =
        (parseFloat(Value.split("/")[0]) / parseFloat(Value.split("/")[1])) *
        100;

      return `${output.toFixed(0)}%`;
    }
    default:
      return null;
  }
};

export const calculateAverageRating = (
  ratings: { Source: string; Value: string }[]
): number => {
  if (!ratings || ratings.length === 0) return 0;

  const values = ratings.map(normalizeRating).filter((v) => !isNaN(v));

  if (!values.length) return 0;

  return values.reduce((sum, val) => sum + val, 0) / values.length;
};
