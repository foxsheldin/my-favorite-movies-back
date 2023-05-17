import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdatedFavoriteGenres {
  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  genreId: number;
}
