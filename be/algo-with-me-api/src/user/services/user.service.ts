import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserResponseDto } from '../dto/user.response.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async saveOrGetByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      const savedUser = await this.userRepository.save({
        email: email,
        nickname: email,
      });
      return new UserResponseDto(savedUser.email, savedUser.nickname);
    }
    return new UserResponseDto(user.email, user.nickname);
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(`${email} 에 해당하는 유저를 찾을 수 없습니다.`);
    return user;
  }
}
