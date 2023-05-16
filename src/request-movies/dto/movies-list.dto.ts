import { Exclude } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MoviesListDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsArray()
  @IsOptional()
  @Exclude()
  selectedGenres?: number[];

  @ArrayMaxSize(2)
  @IsArray()
  @Exclude()
  popularity: number[];

  @IsNumber()
  @IsOptional()
  releaseYear?: number;
}
