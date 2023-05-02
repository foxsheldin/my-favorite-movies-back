import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'favorite_movies' })
export class FavoriteMovie extends BaseEntity {
  @PrimaryColumn({ type: 'character varying' })
  userId: string;

  @Column({ type: 'numeric' })
  movie: number;

  @Column({ type: 'boolean', name: 'watched', default: false })
  isWatched: boolean;

  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
