import { IMovieData } from 'src/request-movies/request-movies.types';

export interface IGetFavoriteMovieListOutput {
  page: number;
  results: IFavoriteMovieData[];
  totalPages: number;
  totalResults: number;
}

export interface IFavoriteMovieData extends IMovieData {
  isFavorite: boolean;
  isWatched: boolean;
}
