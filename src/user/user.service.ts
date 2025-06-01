import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository.searchUsers(query);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('メールアドレスはすでに使用されています');
    }
    return this.userRepository.createUser(createUserDto);
  }
}
