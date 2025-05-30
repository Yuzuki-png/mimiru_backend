import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWTペイロードの型定義
 */
interface JwtPayload {
  sub: number;
  email: string;
}

/**
 * ユーザー情報の型定義
 */
interface UserInfo {
  userId: number;
  email: string;
}

/**
 * JWT認証の戦略を実装するクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * コンストラクタ
   * @param configService 設定サービス
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback_secret',
    });
  }

  /**
   * JWTペイロードからユーザー情報を検証して取得する
   * @param payload JWTペイロード
   * @returns ユーザー情報
   */
  validate(payload: JwtPayload): UserInfo {
    return { userId: payload.sub, email: payload.email };
  }
}
