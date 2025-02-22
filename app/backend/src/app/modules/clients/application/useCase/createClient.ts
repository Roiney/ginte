import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JWTPayload } from 'src/app/security/interface/PayloadJWT.interface';
import ClientObject from '../../domain/client';
import { CreateGntClientDto } from '../../domain/dto/createClient.dto';
import { ClientDAO } from '../../infra/dao/ClientDAO';
import { UserDAO } from '../../infra/dao/userDAO';
import { ClientRepository } from '../../infra/repository/clientRepository';

@Injectable()
export class CreateClient {
  constructor(
    @Inject(UserDAO) private readonly userDAO: UserDAO,
    @Inject(ClientDAO) private readonly clientDAO: ClientDAO,
    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(
    createClientDto: CreateGntClientDto,
    user: JWTPayload,
  ): Promise<ClientObject> {
    try {
      const createUser = await this.userDAO.getOne(user.sub);

      if (!createUser) {
        throw new NotFoundException('User not found or invalid credentials.');
      }

      const emailClientExist = await this.clientDAO.getOneByEmail(
        createClientDto.email,
      );

      if (emailClientExist) {
        throw new BadRequestException('Client email is already registered.');
      }

      const newClient = ClientObject.create({
        fullName: createClientDto.fullName,
        email: createClientDto.email,
        phone: createClientDto.phone,
        birthDate: createClientDto.birthDate,
        address: createClientDto.address,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdById: createUser.id,
      });

      return await this.clientRepository.create(newClient);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }
}
