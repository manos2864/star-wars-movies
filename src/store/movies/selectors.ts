import { createSelector } from "@reduxjs/toolkit";

import { calculateAverageRating } from "@/pages/movies/helpers";
import type { RootState } from "@/store/index.ts";

const moviesReducer = (state: RootState) => state.movies;

export const selectMovieIds = (state: RootState) =>
  moviesReducer(state).movieIds;

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
