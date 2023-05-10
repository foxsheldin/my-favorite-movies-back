import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorite_movies' })
export class FavoriteMovie extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  movieId: number;

  @Column({ type: 'boolean', name: 'watched', default: false })
  isWatched: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
