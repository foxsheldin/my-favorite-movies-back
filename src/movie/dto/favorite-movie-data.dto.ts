import { Field, ObjectType } from '@nestjs/graphql';
import { MovieDto } from 'src/request-movies/dto/movie-data.dto';

@ObjectType()
export class FavoriteMovieDto extends MovieDto {
  @Field({ nullable: true })
  isFavorite?: boolean;

  @Field()
  isWatched: boolean;
}
