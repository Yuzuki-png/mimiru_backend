import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        ...(data.name && { name: data.name }),
      },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async searchUsers(query: string): Promise<User[]> {
    if (!query) {
      return await this.findAllUsers();
    }
    return await this.prisma.user.findMany({
      where: {
        OR: [{ email: { contains: query, mode: 'insensitive' } }],
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
