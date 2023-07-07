import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class UpdateMovieDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
