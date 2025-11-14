import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { type AppDispatch } from "@/store";
import { fetchOmdAction, fetchSwapiAction } from "@/store/movies/actions";

const useFetchMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchMovies = useCallback(async () => {
    try {
      const movies = await dispatch(fetchSwapiAction()).unwrap();
      await Promise.all(
        (movies || []).map((movie) =>
          dispatch(
            fetchOmdAction({ title: movie.title, movieId: movie.episode_id })
          ).unwrap()
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return null;
};

export default useFetchMovies;
