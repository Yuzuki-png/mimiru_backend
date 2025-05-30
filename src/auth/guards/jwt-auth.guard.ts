import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT認証を行うガードクラス
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
