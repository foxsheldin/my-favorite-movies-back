import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenre } from './favorite-genre.entity';
import { GenreService } from './genre.service';

@Module({ imports: [TypeOrmModule.forFeature([FavoriteGenre])], providers: [GenreService] })
export class GenreModule {}
