import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreatedOrDeletedFavoriteMovie } from './created-or-deleted-favorite-movie.dto';

export class UpdatedWatchFavoriteMovieStatus extends CreatedOrDeletedFavoriteMovie {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
