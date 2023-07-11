import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { GenreListOutput } from './dto/genre-list.output';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

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
  getFavoriteGenresList(@CurrentUser('id') userId: string): Promise<number[]> {
    return this.genreService.getFavoriteGenresList(userId);
  }

  @Mutation(() => [Number])
  updateSelectedGenres(
    @CurrentUser('id') userId: string,
    @Args('genreId') genreId: number,
  ): Promise<number[]> {
    return this.genreService.updateSelectedGenres({ genreId, userId });
  }
}
