import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getProfile(@Args('userId') userId: string): Promise<User> {
    return this.userService.getProfile(userId);
  }
}
