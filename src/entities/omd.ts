type SourceType = "Internet Movie Database" | "Rotten Tomatoes" | "Metacritic";

export type Ratings = { Source: SourceType; Value: string };

export interface MovieOmd {
  Director: string;
  Poster: string;
  Ratings: Ratings[];
}
