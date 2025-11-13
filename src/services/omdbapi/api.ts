import axios from "axios";

export const fetchOmdb = async () => {
  try {
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=[${process.env.VITE_OMDB_API_URL}]`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
