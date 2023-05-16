import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { RequestMoviesModule } from './request-movies/request-movies.module';
import POSTRGRES_CONNECTION from './config/postgres.connection';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...POSTRGRES_CONNECTION,
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
    MovieModule,
    GenreModule,
    RequestMoviesModule,
  ],
})
export class AppModule {}
