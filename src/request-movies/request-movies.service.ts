import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import {
  IGenreResponseData,
  IMovieData,
  IMovieResponseData,
} from './request-movies.types';
import { MoviesListDto } from './dto/movies-list.dto';
import { GenreListOutput } from './dto/genre-list.output';

@Injectable()
export class RequestMoviesService {
  private readonly logger = new Logger(RequestMoviesService.name);

  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.defaults.params = {
      apiKey: process.env.MOVIE_DB_API_KEY,
    };

    httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => {
        if (
          response.data &&
          response.headers['content-type'] === 'application/json;charset=utf-8'
        ) {
          response.data = camelizeKeys(response.data);
        }
        return response;
      },
    );

    httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const newConfig = { ...config };

        if (newConfig.headers['Content-Type'] === 'multipart/form-data')
          return newConfig;

        if (config.params) {
          newConfig.params = decamelizeKeys(config.params);
        }
        if (config.data) {
          newConfig.data = decamelizeKeys(config.data);
        }

        return newConfig;
      },
    );
  }

  async getGenre(language?: string): Promise<GenreListOutput[]> {
    const response = await this.httpService.axiosRef.get<IGenreResponseData>(
      'genre/movie/list',
      {
        params: { language },
      },
    );

    return response.data.genres;
  }

  async getMoviesList({
    language,
    selectedGenres,
    releaseYear,
    popularity,
    page,
  }: MoviesListDto): Promise<IMovieResponseData> {
    try {
      const response = await this.httpService.axiosRef.get<IMovieResponseData>(
        'discover/movie',
        {
          params: {
            language,
            withGenres: selectedGenres?.join(',') ?? '',
            year: releaseYear,
            'vote_average.gte': popularity[0],
            'vote_average.lte': popularity[1],
            page,
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getMovieById(movieId: number, language?: string): Promise<IMovieData> {
    try {
      const response = await this.httpService.axiosRef.get(`movie/${movieId}`, {
        params: { language },
      });
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
