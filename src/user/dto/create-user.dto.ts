import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  username: string;

  @Field()
  @IsString()
  password: string;
}
