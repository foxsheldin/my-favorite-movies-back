import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenre } from './favorite-genre.entity';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { RequestMoviesModule } from 'src/request-movies/request-movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteGenre]), RequestMoviesModule],
  providers: [GenreService, GenreResolver],
})
export class GenreModule {}
