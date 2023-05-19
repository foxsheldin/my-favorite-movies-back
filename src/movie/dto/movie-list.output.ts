import { Field, ObjectType } from '@nestjs/graphql';
import { FavoriteMovieDto } from './favorite-movie-data.dto';

@ObjectType()
export class MovieListOutput {
  @Field()
  page: number;

  @Field(() => [FavoriteMovieDto], { nullable: true })
  results?: FavoriteMovieDto[];

  @Field()
  totalPages: number;

  @Field()
  totalResults: number;
}
