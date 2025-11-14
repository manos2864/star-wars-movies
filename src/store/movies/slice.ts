import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchOmdAction, fetchSwapiAction } from "./actions";
import { type MovieResult } from "@/entities/swapi";
import { type MovieOmd } from "@/entities/omd";

type StateMovie = MovieResult & Partial<MovieOmd>;

interface SliceState {
  movies: Record<string, StateMovie>;
  movieIds: number[];
  loading: boolean;
  selectedMovieId: number | null;
}

const initialState: SliceState = {
  movies: {},
  movieIds: [],
  selectedMovieId: null,
  loading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovieId(state, action: PayloadAction<number | null>) {
      state.selectedMovieId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSwapiAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSwapiAction.fulfilled, (state, { payload }) => {
      const movies = payload || [];

      state.loading = false;
      state.movieIds = movies.map((movie) => movie.episode_id);
      state.movies = movies.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.episode_id]: {
            title: cur.title,
            opening_crawl: cur.opening_crawl,
            release_date: cur.release_date,
            episode_id: cur.episode_id,
          },
        }),
        {}
      );
    });

    builder.addCase(fetchSwapiAction.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchOmdAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchOmdAction.fulfilled, (state, { payload }) => {
      const updatedDataMovie = payload.response;
      const movieId = payload.movieId;

      state.loading = false;
      state.movies[movieId] = {
        ...state.movies[movieId],
        Ratings: updatedDataMovie?.Ratings || [],
        Poster: updatedDataMovie?.Poster,
        Director: updatedDataMovie?.Director,
      };
    });

    builder.addCase(fetchOmdAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setSelectedMovieId } = moviesSlice.actions;

export default moviesSlice.reducer;
