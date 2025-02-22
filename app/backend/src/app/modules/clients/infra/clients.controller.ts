import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/app/security/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/app/security/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/security/guards/role-auth.guard';
import { AuthRequestJwt } from 'src/app/security/interface/authRequestJWTStrategy.interface';
import { CreateClient } from '../application/useCase/createClient';
import { FindAllClients } from '../application/useCase/findAllClients';
import { CreateGntClientDto } from '../domain/dto/createClient.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    @Inject(CreateClient) private readonly createClient: CreateClient,
    @Inject(FindAllClients) private readonly findAllClients: FindAllClients,
  ) {}

  @ApiOperation({
    summary: 'Route to create a new Client.',
    description:
      'Route used to register a new Client using information required in JSON.',
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

  @ApiOperation({
    summary: 'Get a paginated list of clients.',
    description:
      'Retrieve a list of clients with optional filters such as name and email.',
    tags: ['Client'],
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
    description: 'Page number (default: 1)',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: false,
    description: 'Number of clients per page (default: 10)',
    example: '10',
  })
  @ApiQuery({
    name: 'order',
    enum: ['asc', 'desc'],
    required: false,
    description: 'Sort order (asc | desc)',
    example: 'asc',
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Filter by client name',
    example: 'John Doe',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
    description: 'Filter by client email',
    example: 'johndoe@example.com',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('name') name?: string,
    @Query('email') email?: string,
  ): Promise<any> {
    const pageValue = Number(page) || 1; // Garantir que `page` é um número válido
    const limitValue = Number(limit) || 10; // Garantir que `limit` é um número válido

    return await this.findAllClients.execute(
      limitValue,
      pageValue,
      name,
      email,
    );
  }
}
