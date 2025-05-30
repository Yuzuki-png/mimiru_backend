import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        ...(data.name && { name: data.name }),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async search(query: string): Promise<User[]> {
    if (!query) {
      return this.findAll();
    }
    return this.prisma.user.findMany({
      where: {
        OR: [{ email: { contains: query, mode: 'insensitive' } }],
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
