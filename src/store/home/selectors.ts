import { createSelector } from "@reduxjs/toolkit";

import { calculateAverageRating } from "@/pages/home/helpers";
import type { RootState } from "@/store/index.ts";

const homeReducer = (state: RootState) => state.home;

export const selectHomeMovieIds = (state: RootState) =>
  homeReducer(state).movieIds;

export const selectHomeMovies = (state: RootState) => homeReducer(state).movies;

export const selectHomeMovie = (state: RootState, movieId: number) =>
  selectHomeMovies(state)[movieId];

export const selectHomeSelectedMovieId = (state: RootState) =>
  homeReducer(state).selectedMovieId;

export const selectHomeSelectedMovie = createSelector(
  [selectHomeMovies, selectHomeSelectedMovieId],
  (movies, selectedId) => {
    if (!selectedId) return null;
    return movies[selectedId] ?? null;
  }
);

export const selectHomeIsLoading = (state: RootState) =>
  homeReducer(state).loading;

export const selectHomeMovieRatings = (state: RootState, movieId: number) =>
  selectHomeMovie(state, movieId)?.Ratings;

export const selectHomeMovieAverageRating = createSelector(
  (state: RootState, movieId: number) =>
    selectHomeMovieRatings(state, movieId) || [],
  (ratings) => calculateAverageRating(ratings)
);
