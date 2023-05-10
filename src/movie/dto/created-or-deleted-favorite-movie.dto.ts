import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatedOrDeletedFavoriteMovie {
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
