import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSwapi } from "@/services/swapi/api";
import { fetchOmdb } from "@/services/omdbapi/api";
import { type MovieResult } from "@/entities/swapi";
import { type MovieOmd } from "@/entities/omd";

export const fetchSwapiAction = createAsyncThunk<
  MovieResult[] | undefined,
  void
>("users/fetchSwapiAction", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSwapi();

    return response;
  } catch (err: unknown) {
    console.error(err);

    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to fetch movies"
    );
  }
});

export const fetchOmdAction = createAsyncThunk<
  { response: MovieOmd | undefined; movieId: number },
  { title: string; movieId: number }
>("users/fetchOmdAction", async ({ title, movieId }, { rejectWithValue }) => {
  try {
    const response = await fetchOmdb(title);

    return { response, movieId };
  } catch (err: unknown) {
    console.error(err);

    return rejectWithValue(
      err instanceof Error ? err.message : "Failed to fetch specific movie"
    );
  }
});
