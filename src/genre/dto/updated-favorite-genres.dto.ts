import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatedFavoriteGenres {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  genreId: number;
}
