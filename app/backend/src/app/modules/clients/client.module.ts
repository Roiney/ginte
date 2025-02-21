import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/app/db/prisma/prisma.module';
import { CreateClient } from './application/useCase/createClient';
import { ClientController } from './infra/clients.controller';
import { UserDAO } from './infra/dao/userDAO';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [CreateClient, UserDAO],
  controllers: [ClientController],
})
export class ClientModule {}
