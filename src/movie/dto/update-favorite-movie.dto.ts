import { IsOptional, IsString } from 'class-validator';
import { UpdateMovieDto } from './update-movie.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateFavoriteMovieDto extends UpdateMovieDto {
  @Field()
  @IsOptional()
  @IsString()
  language?: string;
}
