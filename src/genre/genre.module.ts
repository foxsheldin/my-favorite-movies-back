import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenre } from './favorite-genre.entity';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';

@Module({ imports: [TypeOrmModule.forFeature([FavoriteGenre])], providers: [GenreService, GenreResolver] })
export class GenreModule {}
