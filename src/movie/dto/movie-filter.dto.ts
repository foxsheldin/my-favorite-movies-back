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
export class MovieFilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  language?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  page?: number;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  @Exclude()
  selectedGenresIds?: number[];

  @Field(() => [Number])
  @ArrayMaxSize(2)
  @IsArray()
  @Exclude()
  popularity: number[];

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  releaseYear?: number;
}
