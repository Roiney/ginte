import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/app/db/prisma/prisma.module';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
