import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatedOrDeletedFavoriteMovie } from './dto/created-or-deleted-favorite-movie.dto';
import { FavoriteMovie } from './favorite-movie.entity';
import { UpdatedWatchFavoriteMovieStatus } from './dto/updated-status.dto';
import { RequestMoviesService } from 'src/request-movies/request-movies.service';
import { MovieListOutput } from './dto/movie-list.output';
import { FavoriteMovieDto } from './dto/favorite-movie-data.dto';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { GetFavoriteMovieListInput } from './dto/get-favorite-movie-list.input';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private readonly favoriteMovieRepository: Repository<FavoriteMovie>,
    private readonly requestMoviesService: RequestMoviesService,
  ) {}

  async getFavoriteMovieList(
    userId: string,
    params: GetFavoriteMovieListInput,
  ): Promise<MovieListOutput> {
    const { language, limit, page } = params;

    const [favoriteMoviesIds, totalResults] =
      await this.favoriteMovieRepository.findAndCount({
        where: { userId },
        take: limit,
        skip: limit * (page - 1),
      });

    const favoriteMoviesPromises = favoriteMoviesIds.map((movie) =>
      this.requestMoviesService.getMovieById(movie.movieId, language),
    );
    const favoriteMovies = await Promise.all(favoriteMoviesPromises);

    const results = favoriteMoviesIds.map((movie, index) => ({
      ...favoriteMovies[index],
      isWatched: movie.isWatched,
    }));

    return {
      page,
      results,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
    };
  }

  async getAllAvailableMovieList(
    userId: string,
    params: MovieFilterDto,
  ): Promise<MovieListOutput> {
    const requestFavoriteMovies = this.favoriteMovieRepository.find({
      where: { userId },
    });

    const requestMoviesData = this.requestMoviesService.getMoviesList(params);

    const [favoriteMovies, moviesData] = await Promise.all([
      requestFavoriteMovies,
      requestMoviesData,
    ]);

    const results = moviesData.results.map((movie) => {
      const favoriteMovie = favoriteMovies.find(
        (favoriteMovie) => favoriteMovie.movieId == movie.id,
      );

      return {
        ...movie,
        isFavorite: !!favoriteMovie,
        isWatched: !!favoriteMovie?.isWatched,
      };
    });

    return { ...moviesData, results };
  }

  async getFavoriteMovieIds(userId: string): Promise<number[]> {
    return (
      await this.favoriteMovieRepository.find({ where: { userId: userId } })
    ).map((movie) => movie.movieId);
  }

  async createFavoriteMovie(
    movieDto: CreatedOrDeletedFavoriteMovie,
    language?: string,
  ): Promise<FavoriteMovieDto> {
    const favoriteMovie = await this.favoriteMovieRepository.findOneBy(
      movieDto,
    );

    if (favoriteMovie) {
      throw new BadRequestException(
        'The movie has already been added to favorites',
      );
    }

    await this.favoriteMovieRepository.create(movieDto).save();

    const movieData = await this.requestMoviesService.getMovieById(
      movieDto.movieId,
      language,
    );

    return { ...movieData, isFavorite: true, isWatched: false };
  }

  async deleteFavoriteMovie(
    movieDto: CreatedOrDeletedFavoriteMovie,
  ): Promise<number> {
    const favoriteMovie = await this.favoriteMovieRepository.findOneBy(
      movieDto,
    );

    if (!favoriteMovie) {
      throw new NotFoundException('The movie does not exist in favorites');
    }

    await this.favoriteMovieRepository.delete(movieDto);
    return movieDto.movieId;
  }

  async updateWatchedMovieStatus(
    movieDto: UpdatedWatchFavoriteMovieStatus,
  ): Promise<FavoriteMovie> {
    await this.favoriteMovieRepository.update(
      { movieId: movieDto.movieId, userId: movieDto.userId },
      { isWatched: movieDto.status },
    );

    const favoriteMovie = await this.favoriteMovieRepository.findOne({
      where: {
        movieId: movieDto.movieId,
        userId: movieDto.userId,
      },
    });

    return favoriteMovie;
  }
}
