import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/app/security/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/app/security/guards/jwt-auth.guard';
import { RolesGuard } from 'src/app/security/guards/role-auth.guard';
import { AuthRequestJwt } from 'src/app/security/interface/authRequestJWTStrategy.interface';
import { CreateClient } from '../../application/useCase/createClient';
import { DeleteOneClient } from '../../application/useCase/deleteOne';
import { FindAllClients } from '../../application/useCase/findAllClients';
import { FindOneClient } from '../../application/useCase/findOne';
import { UpdateClient } from '../../application/useCase/updateClient';
import { CreateGntClientDto } from '../../domain/dto/createClient.dto';
import { UpdateGntClientDto } from '../../domain/dto/updateClient';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    @Inject(CreateClient) private readonly createClient: CreateClient,
    @Inject(FindAllClients) private readonly findAllClients: FindAllClients,
    @Inject(FindOneClient) private readonly findOneClient: FindOneClient,
    @Inject(DeleteOneClient) private readonly deleteOneClient: DeleteOneClient,
    @Inject(UpdateClient) private readonly updateClient: UpdateClient,
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
      'Retrieve a paginated list of clients with optional filters such as search (name or email).',
    tags: ['Client'],
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of clients per page (default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description: 'Search clients by name or email',
    example: 'John Doe',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
  ): Promise<any> {
    const pageValue = Number(page) > 0 ? Number(page) : 1;
    const limitValue = Number(limit) > 0 ? Number(limit) : 10;

    return await this.findAllClients.execute(limitValue, pageValue, search);
  }

  @ApiOperation({
    summary: 'Route to retrieve a Payment by ID.',
    description:
      'This route retrieves a Payment record from the database based on the provided ID. The request requires authentication via a Bearer token.',
    tags: ['Payment'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description:
      'ID registered in the database referring to the Payment (e.g., 1dfc9242-746b-40b7-8bd8-3342d0972aa1)',
    example: '1dfc9242-746b-40b7-8bd8-3342d0972aa1',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    // Verifique se o usuário possui a role adequada ou se está acessando as próprias informações
    return await this.findOneClient.execute(id);
  }

  @ApiOperation({
    summary: 'Route to delete a Payment by ID.',
    description:
      'This route deletes a Payment record from the database based on the provided ID. The request requires authentication via a Bearer token.',
    tags: ['Payment'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description:
      'ID registered in the database referring to the Payment (e.g., 1dfc9242-746b-40b7-8bd8-3342d0972aa1)',
    example: '1dfc9242-746b-40b7-8bd8-3342d0972aa1',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return await this.deleteOneClient.execute(id);
  }

  @ApiOperation({
    summary: 'Route to update an existing Client.',
    description:
      'Route used to update an existing Client using the provided ID and updated information in JSON.',
    tags: ['Client'],
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateGntClientDto,
    @Req() request: AuthRequestJwt,
  ): Promise<any> {
    const authenticatedUser = request.user;
    return await this.updateClient.execute(
      id,
      updateClientDto,
      authenticatedUser,
    );
  }
}
