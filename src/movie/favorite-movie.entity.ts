import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'favorite_movies' })
export class FavoriteMovie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'numeric' })
  movieId: number;

  @Field()
  @Column({ type: 'boolean', name: 'watched', default: false })
  isWatched: boolean;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
