import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { saltLength } from 'src/constants/security';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp({ email, password }: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ email });

    if (findUser) {
      throw new BadRequestException(
        'A user with such an email already exists!',
      );
    }

    const encryptedPassword = await argon.hash(password, {
      hashLength: saltLength,
    });

    const user = this.userRepository.create({
      email,
      password: encryptedPassword,
    });
    await user.save();

    return user;
  }

  async getProfile(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
