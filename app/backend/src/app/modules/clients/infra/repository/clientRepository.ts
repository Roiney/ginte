import { Inject } from '@nestjs/common';
import { GntPrismaService } from 'src/app/db/prisma/prismaService.service';
import ClientObject from '../../domain/client';

export class ClientRepository {
  constructor(
    @Inject(GntPrismaService) private readonly prismaService: GntPrismaService,
  ) {}

  async create(data: ClientObject): Promise<ClientObject> {
    const clientCreate = await this.prismaService.gntClient.create({
      data,
    });
    return new ClientObject(
      clientCreate.id,
      clientCreate.fullName,
      clientCreate.email,
      clientCreate.phone,
      clientCreate.birthDate,
      clientCreate.createdAt,
      clientCreate.updatedAt,
      clientCreate.createdById,
      clientCreate.canceledAt,
      clientCreate.modifyById,
    );
  }
}
