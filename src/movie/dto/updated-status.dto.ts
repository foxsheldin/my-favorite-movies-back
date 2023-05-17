import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreatedOrDeletedFavoriteMovie } from './created-or-deleted-favorite-movie.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedWatchFavoriteMovieStatus extends CreatedOrDeletedFavoriteMovie {
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
