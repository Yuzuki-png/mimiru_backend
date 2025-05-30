import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です' })
  readonly password: string;
}

export class RegisterDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です' })
  @MinLength(6, { message: 'パスワードは6文字以上である必要があります' })
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly name?: string;
}
