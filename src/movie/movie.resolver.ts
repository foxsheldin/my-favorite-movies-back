import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { GetFavoriteMovieListOutput } from './dto/get-favorite-movie-list.dto';
import { FavoriteMovie } from './favorite-movie.entity';
import { FavoriteMovieDto } from './dto/favorite-movie-data.dto';
import { AllMovieListDto } from './dto/all-movie-list.dto';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => GetFavoriteMovieListOutput)
  getFavoriteMovieList(
    @Args('userId') userId: string,
    @Args('page') page: number,
    @Args('limit') limit: number,
  ): Promise<GetFavoriteMovieListOutput> {
    return this.movieService.getFavoriteMovieList(userId, page, limit);
  }

  @Query(() => GetFavoriteMovieListOutput)
  getAllMovies(
    @Args('userId') userId: string,
    @Args('params') params: AllMovieListDto,
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
  ): Promise<FavoriteMovieDto> {
    return this.movieService.createFavoriteMovie({ userId, movieId });
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
