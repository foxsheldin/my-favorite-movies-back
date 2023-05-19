import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { UpdatedFavoriteGenres } from './dto/updated-favorite-genres.dto';
import { GenreListOutput } from './dto/genre-list.output';

@Resolver()
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [GenreListOutput])
  getGenreList(
    @Args('language', { nullable: true }) language?: string,
  ): Promise<GenreListOutput[]> {
    return this.genreService.getGenreList(language);
  }

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
