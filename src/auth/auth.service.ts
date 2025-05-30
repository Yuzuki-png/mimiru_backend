import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '@prisma/client';

type UserResponse = Omit<User, 'password'>;

interface TokenResponse {
  readonly access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async authenticateUser(loginDto: LoginDto): Promise<TokenResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが間違っています',
      );
    }
    return this.generateToken(user);
  }

  async registerUser(createUserDto: CreateUserDto): Promise<TokenResponse> {
    const newUser = await this.usersService.createUser(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = newUser;
    return this.generateToken(userInfo);
  }

  private generateToken(user: UserResponse): TokenResponse {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
