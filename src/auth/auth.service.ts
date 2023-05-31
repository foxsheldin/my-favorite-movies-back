import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { saltLength } from 'src/constants/security';

import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async signIn({ email, password }: AuthDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new BadRequestException('Incorrect login or password');

    const isPasswordConfirmed = await argon.verify(user.password, password, {
      saltLength,
    });

    if (!isPasswordConfirmed)
      throw new BadRequestException('Incorrect login or password');

    return user.id;
  }

  async signUp({ email, password }: AuthDto): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ email });

    if (findUser) {
      throw new BadRequestException(
        'A user with such an email already exists!',
      );
    }

    return this.userService.createUser({ email, password });
  }
}
