import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { AuthDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  signIn(@Args('data') dto: AuthDto): Promise<string> {
    return this.authService.signIn(dto);
  }

  @Mutation(() => User)
  signUp(@Args('data') dto: AuthDto): Promise<User> {
    return this.authService.signUp(dto);
  }
}
