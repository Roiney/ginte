import { Inject } from '@nestjs/common';
import { gntUser } from '@prisma/client';
import { GntPrismaService } from 'src/app/db/prisma/prismaService.service';

export class UserDAO {
  constructor(
    @Inject(GntPrismaService) private readonly prismaService: GntPrismaService,
  ) {}

  async getOne(id: string): Promise<gntUser | null> {
    return await this.prismaService.gntUser.findUnique({
      where: { id },
    });
  }
}
