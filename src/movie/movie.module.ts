import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './favorite-movie.entity';
import { MovieService } from './movie.service';
import { RequestMoviesModule } from 'src/request-movies/request-movies.module';
import { MovieResolver } from './movie.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovie]), RequestMoviesModule],
  providers: [MovieService, MovieResolver],
})
export class MovieModule {}
