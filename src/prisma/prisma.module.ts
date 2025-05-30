import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * データベースアクセスを提供するモジュール
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
