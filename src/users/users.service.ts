import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async search(query: string): Promise<User[]> {
    return this.userRepository.search(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('メールアドレスはすでに使用されています');
    }
    return this.userRepository.create(createUserDto);
  }
}
