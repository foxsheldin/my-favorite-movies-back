import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class AuthOutput {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
