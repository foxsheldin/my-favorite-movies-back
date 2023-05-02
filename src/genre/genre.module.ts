import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenre } from './favorite-genre.entity';

@Module({ imports: [TypeOrmModule.forFeature([FavoriteGenre])] })
export class GenreModule {}
