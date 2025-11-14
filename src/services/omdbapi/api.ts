import { MovieOmd } from "@/entities/omd";
import axios from "axios";

export const fetchOmdb = async (title: string) => {
  try {
    const apiKey = import.meta.env.VITE_OMDB_API_URL;

    const res = await axios.get<MovieOmd>(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}&plot=full`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
