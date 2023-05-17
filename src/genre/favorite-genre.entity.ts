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
@Entity({ name: 'favorite_genres' })
export class FavoriteGenre extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ type: 'numeric' })
  genreId: number;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
