import { useQuery } from "@tanstack/react-query";
import { fetchSwapi } from "./api";
import { FETCH_SWAPI } from "./query-keys";

export const useFetchSwapi = () =>
  useQuery({
    queryKey: [FETCH_SWAPI],
    queryFn: fetchSwapi,
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
  });
