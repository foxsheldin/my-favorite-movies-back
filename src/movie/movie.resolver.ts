import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { MovieListOutput } from './dto/movie-list.output';
import { FavoriteMovie } from './favorite-movie.entity';
import { FavoriteMovieDto } from './dto/favorite-movie-data.dto';
import { MovieFilterDto } from './dto/movie-filter.dto';
import { GetFavoriteMovieListInput } from './dto/get-favorite-movie-list.input';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => MovieListOutput)
  getFavoriteMovieList(
    @CurrentUser('id') userId: string,
    @Args('params') params: GetFavoriteMovieListInput,
  ): Promise<MovieListOutput> {
    return this.movieService.getFavoriteMovieList(userId, params);
  }

  @Query(() => MovieListOutput)
  getAllAvailableMovieList(
    @CurrentUser('id') userId: string,
    @Args('params') params: MovieFilterDto,
  ): Promise<MovieListOutput> {
    return this.movieService.getAllAvailableMovieList(userId, params);
  }

  @Query(() => [Number])
  getFavoriteMovieIds(@CurrentUser('id') userId: string): Promise<number[]> {
    return this.movieService.getFavoriteMovieIds(userId);
  }

  @Mutation(() => FavoriteMovieDto)
  updateFavoriteMovie(
    @CurrentUser('id') userId: string,
    @Args('movieId') movieId: number,
    @Args('language', { nullable: true }) language?: string,
  ): Promise<FavoriteMovieDto> {
    return this.movieService.updateFavoriteMovie({
      movieId,
      userId,
      language,
    });
  }

  @Mutation(() => FavoriteMovie)
  updateWatchedMovieStatus(
    @CurrentUser('id') userId: string,
    @Args('movieId') movieId: number,
  ): Promise<FavoriteMovie> {
    return this.movieService.updateWatchedMovieStatus({
      userId,
      movieId,
    });
  }
}
