import { Inject } from '@nestjs/common';
import { gntClient } from '@prisma/client';
import { GntPrismaService } from 'src/app/db/prisma/prismaService.service';

export class ClientDAO {
  constructor(
    @Inject(GntPrismaService) private readonly prismaService: GntPrismaService,
  ) {}

  async getOneByEmail(email: string): Promise<gntClient | null> {
    return await this.prismaService.gntClient.findUnique({
      where: { email },
    });
  }
}
