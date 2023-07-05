import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthOutput } from './dto/auth.output';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Request } from 'express';
import { PublicRoute } from 'src/shared/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Mutation(() => AuthOutput)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args('authDto') _: AuthDto,
    @Context('user') user: User,
    @Context('req') req: Request,
  ): Promise<AuthOutput> {
    const result = await this.authService.signIn(user);
    req.res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: true,
    });

    return result;
  }

  @PublicRoute()
  @Mutation(() => User)
  signUp(@Args('authDto') dto: AuthDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Mutation(() => Boolean)
  logout(@Context('req') req: Request): boolean {
    req.res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
    });

    return true;
  }
}
