import { IFavoriteMovieData } from 'src/movie/favorite-movies.types';

export interface IGenreResponseData {
  genres: IGenreItemData[];
}

export interface IGenreItemData {
  id: number;
  name: string;
}

export interface IMovieResponseData {
  page: number;
  results: IMovieData[] & IFavoriteMovieData[];
  totalPages: number;
  totalResults: number;
}

export interface IMovieData {
  adult: boolean;
  backdropPath: string;
  genreIds: number[] | string[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
