import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JWTPayload } from 'src/app/security/interface/PayloadJWT.interface';
import ClientObject from '../../domain/client';
import { UpdateGntClientDto } from '../../domain/dto/updateClient';
import { UserDAO } from '../../infra/dao/userDAO';
import { ClientRepository } from '../../infra/repository/clientRepository';

@Injectable()
export class UpdateClient {
  constructor(
    @Inject(UserDAO) private readonly userDAO: UserDAO,

    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(
    id: string,
    updateClientDto: UpdateGntClientDto,
    user: JWTPayload,
  ): Promise<ClientObject> {
    try {
      const modifyUser = await this.userDAO.getOne(user.sub);

      if (!modifyUser) {
        throw new NotFoundException('User not found or invalid credentials.');
      }

      const register = await this.clientRepository.findOne(id);
      if (!register) {
        throw new NotFoundException('Client not found.');
      }

      // Atualizando os valores apenas se forem fornecidos no DTO
      const updatedClient = new ClientObject(
        register.id,
        updateClientDto.fullName ?? register.fullName,
        updateClientDto.email ?? register.email,
        updateClientDto.phone ?? register.phone,
        updateClientDto.birthDate ?? register.birthDate,
        updateClientDto.address ?? register.address,
        register.createdAt,
        new Date(), // Atualiza a data de modificação
        register.createdById,
        null,
        modifyUser.id, // Corrigido para passar corretamente
      );

      return await this.clientRepository.update(id, updatedClient);
    } catch (error) {
      throw new BadRequestException('Failed to update client.');
    }
  }
}
