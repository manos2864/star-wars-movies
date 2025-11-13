export type MovieResult = {
  title: string;
  url: string;
  release_date: string;
  director: string;
  episode_id: number;
  producer: string;
};

export interface SwapiResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: MovieResult[];
}
