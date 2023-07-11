import { Field, InputType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class MoviesListDto {
  @Field()
  @IsOptional()
  @IsString()
  language?: string;

  @Field()
  @IsOptional()
  @IsNumber()
  page?: number;

  @Field(() => [Number])
  @IsOptional()
  @IsArray()
  @Exclude()
  selectedGenresIds?: number[];

  @Field(() => [Number])
  @ArrayMaxSize(2)
  @IsArray()
  @Exclude()
  popularity: number[];

  @Field()
  @IsOptional()
  @IsNumber()
  releaseYear?: number;
}
