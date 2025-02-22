import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/app/db/prisma/prisma.module';
import { CreateClient } from './application/useCase/createClient';
import { FindAllClients } from './application/useCase/findAllClients';
import { ClientController } from './infra/clients.controller';
import { ClientDAO } from './infra/dao/ClientDAO';
import { UserDAO } from './infra/dao/userDAO';
import { ClientRepository } from './infra/repository/clientRepository';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    CreateClient,
    UserDAO,
    ClientRepository,
    ClientDAO,
    FindAllClients,
  ],
  controllers: [ClientController],
})
export class ClientModule {}
