import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { GetFavoriteMovieListOutput } from './dto/get-favorite-movie-list.output';
import { FavoriteMovie } from './favorite-movie.entity';
import { FavoriteMovieDto } from './dto/favorite-movie-data.dto';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { GetFavoriteMovieListInput } from './dto/get-favorite-movie-list.input';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => GetFavoriteMovieListOutput)
  getFavoriteMovieList(
    @Args('userId') userId: string,
    @Args('params') params: GetFavoriteMovieListInput,
  ): Promise<GetFavoriteMovieListOutput> {
    return this.movieService.getFavoriteMovieList(userId, params);
  }

  @Query(() => GetFavoriteMovieListOutput)
  getAllMovies(
    @Args('userId') userId: string,
    @Args('params') params: MovieFilterDto,
  ): Promise<GetFavoriteMovieListOutput> {
    return this.movieService.getAllMovies(userId, params);
  }

  @Query(() => [Number])
  getFavoriteMovieIds(@Args('userId') userId: string): Promise<number[]> {
    return this.movieService.getFavoriteMovieIds(userId);
  }

  @Mutation(() => FavoriteMovieDto)
  createFavoriteMovie(
    @Args('userId') userId: string,
    @Args('movieId') movieId: number,
    @Args('language', { nullable: true }) language?: string,
  ): Promise<FavoriteMovieDto> {
    return this.movieService.createFavoriteMovie({ userId, movieId }, language);
  }

  @Mutation(() => Number)
  deleteFavoriteMovie(
    @Args('userId') userId: string,
    @Args('movieId') movieId: number,
  ): Promise<number> {
    return this.movieService.deleteFavoriteMovie({ userId, movieId });
  }

  @Mutation(() => FavoriteMovie)
  updateWatchedMovieStatus(
    @Args('userId') userId: string,
    @Args('movieId') movieId: number,
    @Args('status') status: boolean,
  ): Promise<FavoriteMovie> {
    return this.movieService.updateWatchedMovieStatus({
      userId,
      movieId,
      status,
    });
  }
}
