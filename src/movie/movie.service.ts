import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatedOrDeletedFavoriteMovie } from './dto/created-or-deleted-favorite-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteMovie } from './favorite-movie.entity';
import { Repository } from 'typeorm';
import { UpdatedWatchFavoriteMovieStatus } from './dto/updated-status.dto';
import { RequestMoviesService } from 'src/request-movies/request-movies.service';
import {
  IFavoriteMovieData,
  IGetFavoriteMovieListOutput,
} from './favorite-movies.types';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private readonly favoriteMovieRepository: Repository<FavoriteMovie>,
    private readonly requestMoviesService: RequestMoviesService,
  ) {}

  async getFavoriteMovieList(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<IGetFavoriteMovieListOutput> {
    const [favoriteMoviesIds, totalResults] =
      await this.favoriteMovieRepository.findAndCount({
        where: { userId },
        take: limit,
        skip: limit * (page - 1),
      });

    const favoriteMoviesPromises = favoriteMoviesIds.map((movie) =>
      this.requestMoviesService.getMovieById(movie.movieId),
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

  async getFavoriteMovieIds(userId: string): Promise<number[]> {
    return (
      await this.favoriteMovieRepository.find({ where: { userId: userId } })
    ).map((movie) => movie.movieId);
  }

  async createFavoriteMovie(
    movieDto: CreatedOrDeletedFavoriteMovie,
  ): Promise<IFavoriteMovieData> {
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
