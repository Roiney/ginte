import { Inject, NotFoundException } from '@nestjs/common';
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
      clientCreate.address,
      clientCreate.createdAt,
      clientCreate.updatedAt,
      clientCreate.createdById,
      clientCreate.canceledAt,
      clientCreate.modifyById,
    );
  }

  async update(id: string, data: ClientObject): Promise<ClientObject> {
    const udpateCreate = await this.prismaService.gntClient.update({
      where: { id },
      data,
    });
    return new ClientObject(
      udpateCreate.id,
      udpateCreate.fullName,
      udpateCreate.email,
      udpateCreate.phone,
      udpateCreate.birthDate,
      udpateCreate.address,
      udpateCreate.createdAt,
      udpateCreate.updatedAt,
      udpateCreate.createdById,
      udpateCreate.canceledAt,
      udpateCreate.modifyById,
    );
  }

  async findOne(id: string): Promise<ClientObject> {
    const findClient = await this.prismaService.gntClient.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        birthDate: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        canceledAt: true,
        modifyById: true,
      }, // Opcional para otimizar a consulta
    });

    // 🚨 Se não encontrar, lança erro
    if (!findClient) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    // 🔄 Retorna o cliente encapsulado no DTO
    return new ClientObject(
      findClient.id,
      findClient.fullName,
      findClient.email,
      findClient.phone,
      findClient.birthDate,
      findClient.address,
      findClient.createdAt,
      findClient.updatedAt,
      findClient.createdById,
      findClient.canceledAt,
      findClient.modifyById,
    );
  }

  async deleteOne(id: string): Promise<ClientObject> {
    const deleteClient = await this.prismaService.gntClient.delete({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        birthDate: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        canceledAt: true,
        modifyById: true,
      }, // Opcional para otimizar a consulta
    });

    // 🚨 Se não encontrar, lança erro
    if (!deleteClient) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    // 🔄 Retorna o cliente encapsulado no DTO
    return new ClientObject(
      deleteClient.id,
      deleteClient.fullName,
      deleteClient.email,
      deleteClient.phone,
      deleteClient.birthDate,
      deleteClient.address,
      deleteClient.createdAt,
      deleteClient.updatedAt,
      deleteClient.createdById,
      deleteClient.canceledAt,
      deleteClient.modifyById,
    );
  }
}
