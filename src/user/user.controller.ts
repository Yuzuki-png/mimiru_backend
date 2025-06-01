import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/jwt/guards/jwt-auth.guard';
import { User } from '@prisma/client';

type UserResponse = Omit<User, 'password'>;

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<UserResponse[]> {
    const users = await this.userService.findAllUsers();
    return users.map(({ password: _, ...user }) => user);
  }

  @Get('search')
  async searchUsers(@Query('q') query: string): Promise<UserResponse[]> {
    const users = await this.userService.searchUsers(query);
    return users.map(({ password: _, ...user }) => user);
  }
}
