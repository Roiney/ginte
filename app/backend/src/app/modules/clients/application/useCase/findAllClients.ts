import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { gntClient } from '@prisma/client';
import { ClientDAO } from '../../infra/dao/ClientDAO';
interface ClientSearchConditions {
  AND?: Array<Record<string, any>>;
}
@Injectable()
export class FindAllClients {
  constructor(@Inject(ClientDAO) private readonly clientDAO: ClientDAO) {}

  async execute(
    limit: number,
    page: number,
    search?: string,
  ): Promise<{
    clients: gntClient[];
    total: number;
    limit: number;
    page: number;
  }> {
    try {
      const whereConditions: ClientSearchConditions = {
        AND: [],
      };

      if (search) {
        whereConditions.AND?.push({
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        });
      }

      const { total, clients } = await this.clientDAO.findAll(
        limit,
        page,
        whereConditions,
      );

      return { total, limit, page, clients };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }
}
