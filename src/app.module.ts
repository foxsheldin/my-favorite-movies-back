import { ApolloDriver } from '@nestjs/apollo';
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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';

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
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      cors: {
        credential: true,
        origin: process.env.FRONTEND_URL,
        exposedHeaders: ['set-cookie'],
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
