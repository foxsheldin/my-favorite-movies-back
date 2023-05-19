import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenreListOutput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
