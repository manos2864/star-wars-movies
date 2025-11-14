import { createSelector } from "@reduxjs/toolkit";

import { calculateAverageRating, getTotalRating } from "@/pages/movies/helpers";
import type { RootState } from "@/store/index.ts";
import { numberToRoman } from "@/utils/display";
import { SORTING_KEY_ENUMS } from "./slice";

const moviesReducer = (state: RootState) => state.movies;

const selectMovieIds = (state: RootState) => moviesReducer(state).movieIds;

const selectMovies = (state: RootState) => moviesReducer(state).movies;

export const selectMovie = (state: RootState, movieId: number) =>
  selectMovies(state)[movieId];

export const selectSelectedMovieId = (state: RootState) =>
  moviesReducer(state).selectedMovieId;

export const selectSelectedMovie = createSelector(
  [selectMovies, selectSelectedMovieId],
  (movies, selectedId) => {
    if (!selectedId) return null;
    return movies[selectedId] ?? null;
  }
);

export const selectMoviesAreLoading = (state: RootState) =>
  moviesReducer(state).loading;

export const selectMovieRatings = (state: RootState, movieId: number) =>
  selectMovie(state, movieId)?.Ratings;

export const selectMovieAverageRating = createSelector(
  (state: RootState, movieId: number) =>
    selectMovieRatings(state, movieId) || [],
  (ratings) => calculateAverageRating(ratings)
);

export const selectMovieTitle = createSelector(
  (state: RootState, movieId: number) => selectMovie(state, movieId),
  (_: RootState, movieId: number) => movieId,
  (movie, movieId) => `Episode ${numberToRoman(movieId)} - ${movie.title}`
);

const selectMovieFilters = (state: RootState) => moviesReducer(state).filters;

export const selectMovieFilterSearch = (state: RootState) =>
  selectMovieFilters(state).search;

export const selectMovieFilterSorting = (state: RootState) =>
  selectMovieFilters(state).sorting;

export const selectFilteredSortedMovieIds = createSelector(
  [
    selectMovies,
    selectMovieIds,
    (state: RootState) => moviesReducer(state).filters,
  ],
  (movies, movieIds, filters) => {
    let result = [...movieIds];

    if (filters.search) {
      result = result.filter(
        (id) =>
          movies[id].title
            .toLowerCase()
            .includes(filters.search!.toLowerCase()) ||
          movies[id].Director?.toLowerCase().includes(
            filters.search!.toLowerCase()
          ) ||
          movies[id].episode_id
            .toString()
            .toLowerCase()
            .includes(filters.search!.toLowerCase())
      );
    }

    if (filters.sorting) {
      result.sort((a, b) => {
        const movieA = movies[a];
        const movieB = movies[b];

        switch (filters.sorting) {
          case SORTING_KEY_ENUMS.YEAR:
            return (
              new Date(movieA.release_date).getFullYear() -
              new Date(movieB.release_date).getFullYear()
            );
          case SORTING_KEY_ENUMS.EPISODE:
            return movieA.episode_id - movieB.episode_id;
          case SORTING_KEY_ENUMS.TOTAL_RATING:
            const ratingA = movieA.Ratings ? getTotalRating(movieA.Ratings) : 0;
            const ratingB = movieB.Ratings ? getTotalRating(movieB.Ratings) : 0;

            return ratingB - ratingA;
          default:
            return 0;
        }
      });
    }

    return result;
  }
);
