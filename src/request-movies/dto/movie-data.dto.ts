import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieDto {
  @Field()
  adult: boolean;

  @Field()
  backdropPath: string;

  @Field(() => [Number])
  genreIds: number[];

  @Field()
  id: number;

  @Field()
  originalLanguage: string;

  @Field()
  originalTitle: string;

  @Field()
  overview: string;

  @Field()
  popularity: number;

  @Field({ nullable: true })
  posterPath?: string;

  @Field()
  releaseDate: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  video: boolean;

  @Field()
  voteAverage: number;

  @Field()
  voteCount: number;
}
