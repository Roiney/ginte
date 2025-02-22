import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ClientObject from '../../domain/client';
import { ClientDAO } from '../../infra/dao/ClientDAO';
import { ClientRepository } from '../../infra/repository/clientRepository';

@Injectable()
export class FindOneClient {
  constructor(
    @Inject(ClientDAO) private readonly clientDAO: ClientDAO,
    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id: string): Promise<ClientObject> {
    try {
      const clientExist = await this.clientDAO.getOne(id);

      if (!clientExist) {
        throw new NotFoundException('Cliente não encontrado.');
      }

      return await this.clientRepository.findOne(id);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }
}
