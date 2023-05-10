import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorite_genres' })
export class FavoriteGenre extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  genreId: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
