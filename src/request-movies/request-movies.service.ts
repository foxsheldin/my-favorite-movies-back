import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import {
  IGenreResponseData,
  IMovieData,
  IMovieResponseData,
} from './request-movies.types';
import { GenreDto } from './dto/genre.dto';
import { MoviesListDto } from './dto/movies-list.dto';

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

  async getGenre(dto: GenreDto): Promise<IGenreResponseData> {
    const response = await this.httpService.axiosRef.get('genre/movie/list', {
      params: { language: dto.language },
    });
    return response.data;
  }

  async getMoviesList(dto: MoviesListDto): Promise<IMovieResponseData> {
    try {
      const response = await this.httpService.axiosRef.get<IMovieResponseData>(
        'discover/movie',
        {
          params: {
            language: dto.language,
            withGenres: dto.selectedGenres?.join(',') ?? '',
            year: dto.releaseYear,
            'vote_average.gte': dto.popularity[0],
            'vote_average.lte': dto.popularity[1],
            page: dto.page,
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getMovieById(movieId: number): Promise<IMovieData> {
    try {
      const response = await this.httpService.axiosRef.get(`movie/${movieId}`);
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
