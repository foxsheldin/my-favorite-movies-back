import { FavoriteMovie } from 'src/movie/favorite-movie.entity';
import { FavoriteGenre } from 'src/genre/favorite-genre.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ type: 'character varying' })
  password: string;

  @Field(() => [FavoriteMovie])
  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user, {
    eager: true,
  })
  favoriteMovies: FavoriteMovie[];

  @Field(() => [FavoriteGenre])
  @OneToMany(() => FavoriteGenre, (favoriteGenre) => favoriteGenre.user, {
    eager: true,
  })
  favoriteGenres: FavoriteGenre[];
}
