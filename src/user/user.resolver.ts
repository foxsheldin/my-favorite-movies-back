import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Resolver()
export class UserResolver {
  @Query(() => User)
  getProfile(@CurrentUser() user: User): User {
    return user;
  }
}
