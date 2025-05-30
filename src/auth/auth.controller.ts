import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface TokenResponse {
  readonly access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenResponse> {
    return this.authService.authenticateUser(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<TokenResponse> {
    return this.authService.registerUser(createUserDto);
  }
}
