import { describe, it, expect } from "vitest";

import { selectFilteredSortedMovieIds } from "@/store/movies/selectors";
import type { RootState } from "@/store";
import { SORTING_KEY_ENUMS } from "@/store/movies/slice";

const state = {
  movies: {
    movies: {
      1: {
        title: "A New Hope",
        episode_id: 1,
        release_date: "1977-05-25",
        Ratings: [{ Source: "Internet Movie Database", Value: "8/10" }],
      },
      2: {
        title: "The Empire Strikes Back",
        episode_id: 2,
        release_date: "1980-05-21",
        Ratings: [{ Source: "Internet Movie Database", Value: "9/10" }],
      },
      3: {
        title: "Return of the Jedi",
        episode_id: 3,
        release_date: "1983-05-25",
        Ratings: [],
      },
    },
    movieIds: [1, 2, 3],
    loading: false,
    selectedMovieId: null,
    filters: { search: null, sorting: null },
  },
} as unknown as RootState;

describe("Test cases for selectFilteredSortedMovieIds selector", () => {
  it("should return all IDs if no filters", () => {
    const result = selectFilteredSortedMovieIds(state);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should filters by search", () => {
    const filteredState = {
      ...state,
      movies: {
        ...state.movies,
        filters: { search: "empire", sorting: SORTING_KEY_ENUMS.EPISODE },
      },
    };
    const result = selectFilteredSortedMovieIds(filteredState);
    expect(result).toEqual([2]); // only "The Empire Strikes Back"
  });

  it("should sort by episode", () => {
    const sortedState = {
      ...state,
      movies: {
        ...state.movies,
        filters: { search: "", sorting: SORTING_KEY_ENUMS.EPISODE },
      },
    };
    const result = selectFilteredSortedMovieIds(sortedState);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should sort by total rating descending", () => {
    const sortedState = {
      ...state,
      movies: {
        ...state.movies,
        filters: { search: "", sorting: SORTING_KEY_ENUMS.TOTAL_RATING },
      },
    };
    const result = selectFilteredSortedMovieIds(sortedState);
    // Ratings: 2:9, 1:8, 3:0
    expect(result).toEqual([2, 1, 3]);
  });

  it("should filters and sort at the same time", () => {
    const filteredSortedState = {
      ...state,
      movies: {
        ...state.movies,
        filters: { search: "the", sorting: SORTING_KEY_ENUMS.TOTAL_RATING },
      },
    };
    const result = selectFilteredSortedMovieIds(filteredSortedState);

    // 2: "The Empire Strikes Back"
    // 3: Return of the Jedi"
    expect(result).toEqual([2, 3]);
  });
});
