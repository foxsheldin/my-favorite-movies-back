import { FavoriteMovie } from 'src/movie/favorite-movie.entity';
import { FavoriteGenre } from 'src/genre/favorite-genre.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'character varying' })
  password: string;

  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  favoriteMovies: FavoriteMovie[];

  @OneToMany(() => FavoriteGenre, (favoriteGenre) => favoriteGenre.user)
  favoriteGenres: FavoriteGenre[];
}
