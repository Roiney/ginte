import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/app/security/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/app/security/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/security/guards/role-auth.guard';
import { AuthRequestJwt } from 'src/app/security/interface/authRequestJWTStrategy.interface';
import { CreateClient } from '../application/useCase/createClient';
import { CreateGntClientDto } from '../domain/dto/createClient.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    @Inject(CreateClient) private readonly createClient: CreateClient,
  ) {}

  @ApiOperation({
    summary: 'Route to create a new Client.',
    description:
      'Route used to register a new Client using information required in json.',
    tags: ['Client'],
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(
    @Body() createClientDto: CreateGntClientDto,
    @Req() request: AuthRequestJwt,
  ): Promise<any> {
    const authenticatedUser = request.user;
    return await this.createClient.execute(createClientDto, authenticatedUser);
  }
}
