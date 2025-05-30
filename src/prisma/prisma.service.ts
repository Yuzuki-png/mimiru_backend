import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prismaクライアントを提供するサービス
 * データベース接続のライフサイクル管理を行う
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * モジュール初期化時にデータベースに接続する
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * モジュール破棄時にデータベース接続を切断する
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
