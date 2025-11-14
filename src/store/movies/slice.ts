import {
  createSlice,
  isPending,
  isRejected,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchOmdAction, fetchSwapiAction } from "./actions";
import { type MovieResult } from "@/entities/swapi";
import { type MovieOmd } from "@/entities/omd";

type StateMovie = MovieResult & Partial<MovieOmd>;

export type SortingType = "year" | "episode" | "totalRating";

interface SliceState {
  movies: Record<string, StateMovie>;
  movieIds: number[];
  loading: boolean;
  selectedMovieId: number | null;
  filters: { search: string; sorting: SortingType };
}

const initialState: SliceState = {
  movies: {},
  movieIds: [],
  selectedMovieId: null,
  filters: { search: "", sorting: "episode" },
  loading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovieId(state, action: PayloadAction<number | null>) {
      state.selectedMovieId = action.payload;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    setSortingFilter(state, action: PayloadAction<SortingType>) {
      state.filters.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
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

    builder.addMatcher(
      isRejected(fetchSwapiAction, fetchOmdAction),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(isPending(fetchSwapiAction, fetchOmdAction), (state) => {
      state.loading = true;
    });
  },
});

export const { setSelectedMovieId, setSearchFilter, setSortingFilter } =
  moviesSlice.actions;

export default moviesSlice.reducer;
