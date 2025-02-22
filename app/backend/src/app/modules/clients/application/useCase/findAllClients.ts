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
    name?: string,
    email?: string,
  ): Promise<{
    clients: gntClient[];
    total: number;
    limit: number;
    page: number;
  }> {
    try {
      const conditions: Array<Record<string, any>> = [];

      if (name) {
        conditions.push({ fullName: name });
      }

      if (email) {
        conditions.push({ email });
      }
      const whereConditions: ClientSearchConditions =
        conditions.length > 0 ? { AND: conditions } : {};

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
