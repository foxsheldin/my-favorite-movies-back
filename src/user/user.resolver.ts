import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('data') dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Query(() => User)
  getProfile(@Args('userId') userId: string): Promise<User> {
    return this.userService.getProfile(userId);
  }
}
