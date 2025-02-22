import { Inject } from '@nestjs/common';
import { gntClient, Prisma } from '@prisma/client';
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

  async findAll(
    limit: number,
    page: number,
    whereConditions: Prisma.gntClientScalarWhereInput,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{
    clients: gntClient[];
    total: number;
  }> {
    // Definição do offset para paginação
    const offset = (page - 1) * limit;

    // Obtém a contagem total de registros com os filtros aplicados
    const total = await this.prismaService.gntClient.count({
      where: whereConditions,
    });

    // Busca os relatórios agendados com filtros, paginação e ordenação
    const clients = await this.prismaService.gntClient.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: sortOrder, // Ordenação padrão pela scheduledReports de criação
      },
      skip: offset,
      take: limit,
    });

    return { clients, total };
  }
}
