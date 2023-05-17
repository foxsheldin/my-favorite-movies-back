import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { UpdatedFavoriteGenres } from './dto/updated-favorite-genres.dto';

@Resolver()
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [Number])
  getFavoriteGenresList(@Args('userId') userId: string): Promise<number[]> {
    return this.genreService.getFavoriteGenresList(userId);
  }

  @Mutation(() => [Number])
  updateSelectedGenres(
    @Args('data') genreDto: UpdatedFavoriteGenres,
  ): Promise<number[]> {
    return this.genreService.updateSelectedGenres(genreDto);
  }
}
