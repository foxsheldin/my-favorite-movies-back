import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'favorite_genres' })
export class FavoriteGenre extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @Column({ type: 'numeric' })
  genreId: number;

  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
