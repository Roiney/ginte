import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JWTPayload } from 'src/app/security/interface/PayloadJWT.interface';
import AddressObject from '../../domain/address';
import ClientObject from '../../domain/client';
import { CreateGntClientDto } from '../../domain/dto/createClient.dto';
import { UserDAO } from '../../infra/dao/userDAO';

@Injectable()
export class CreateClient {
  constructor(@Inject(UserDAO) private readonly userDAO: UserDAO) {}

  async execute(
    createClientDto: CreateGntClientDto,
    user: JWTPayload,
  ): Promise<any> {
    try {
      const createUser = await this.userDAO.getOne(user.sub);

      if (!createUser) {
        throw new NotFoundException('User not found or invalid credentials.');
      }
      const newClient = ClientObject.create({
        fullName: createClientDto.fullName,
        email: createClientDto.email,
        phone: createClientDto.phone,
        birthDate: createClientDto.birthDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdById: createUser.id,
      });

      const newAddress = AddressObject.create({
        street: createClientDto.address?.street,
        number: createClientDto.address?.number,
        city: createClientDto.address?.city,
        state: createClientDto.address?.state,
        zipCode: createClientDto.address?.zipCode,
        clientId: newClient.id,
      });

      console.log(newClient);
      console.log(newAddress);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }
}
