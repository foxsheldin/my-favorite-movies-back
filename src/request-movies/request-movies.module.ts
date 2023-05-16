import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RequestMoviesService } from './request-movies.service';
import { BASE_MOVIE_DB_URL } from './request-movies.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from 'src/movie/favorite-movie.entity';

@Module({
  imports: [
    HttpModule.register({
      baseURL: BASE_MOVIE_DB_URL,
    }),
    TypeOrmModule.forFeature([FavoriteMovie]),
  ],
  providers: [RequestMoviesService],
  exports: [RequestMoviesService],
})
export class RequestMoviesModule {}
