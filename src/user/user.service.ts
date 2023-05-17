import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser({ username, password }: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ username });

    if (findUser) {
      throw new BadRequestException(
        'A user with such an email already exists!',
      );
    }

    const user = User.create({ username, password });
    await user.save();

    return user;
  }

  async getProfile(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
