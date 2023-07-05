import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { saltLength } from 'src/constants/security';

import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthOutput } from './dto/auth.output';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOneBy({ email });
    const verifyPassword = await argon.verify(user?.password, password, {
      hashLength: saltLength,
    });

    if (user && verifyPassword) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signIn(user: User): Promise<AuthOutput> {
    return {
      access_token: this.jwtService.sign({ email: user.email, id: user.id }),
      user,
    };
  }

  async signUp({ email, password }: AuthDto): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ email });

    if (findUser) {
      throw new BadRequestException(
        'A user with such an email already exists!',
      );
    }

    const encryptedPassword = await argon.hash(password, {
      hashLength: saltLength,
    });

    return this.userService.createUser({ email, password: encryptedPassword });
  }
}
