import axios from "axios";
import { SwapiResponse } from "@/entities/swapi";

export const fetchSwapi = async () => {
  try {
    const res = await axios.get<SwapiResponse>(
      "https://swapi.dev/api/films/?format=json"
    );
    return res.data.results;
  } catch (err) {
    console.error(err);
  }
};
