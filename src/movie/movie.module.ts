import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './favorite-movie.entity';
import { MovieService } from './movie.service';
import { RequestMoviesModule } from 'src/request-movies/request-movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovie]), RequestMoviesModule],
  providers: [MovieService],
})
export class MovieModule {}
