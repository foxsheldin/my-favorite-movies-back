import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './favorite-movie.entity';

@Module({ imports: [TypeOrmModule.forFeature([FavoriteMovie])] })
export class MovieModule {}
