import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { RequestMoviesModule } from './request-movies/request-movies.module';
import { AuthModule } from './auth/auth.module';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
