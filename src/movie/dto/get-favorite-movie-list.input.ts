import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class GetFavoriteMovieListInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  language?: string;
}
