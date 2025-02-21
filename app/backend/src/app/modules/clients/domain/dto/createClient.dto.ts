import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateGntAddressDto {
  @IsString({ message: 'O campo street deve ser uma string' })
  @IsNotEmpty({ message: 'O campo street não pode estar vazio' })
  @ApiProperty({
    example: 'Av. Paulista',
    required: true,
    description: 'Rua do endereço',
    format: 'string',
  })
  street!: string;

  @IsString({ message: 'O campo number deve ser uma string' })
  @IsNotEmpty({ message: 'O campo number não pode estar vazio' })
  @ApiProperty({
    example: '1234',
    required: true,
    description: 'Número do endereço',
    format: 'string',
  })
  number!: string;

  @IsString({ message: 'O campo city deve ser uma string' })
  @IsNotEmpty({ message: 'O campo city não pode estar vazio' })
  @ApiProperty({
    example: 'São Paulo',
    required: true,
    description: 'Cidade do endereço',
    format: 'string',
  })
  city!: string;

  @IsString({ message: 'O campo state deve ser uma string' })
  @IsNotEmpty({ message: 'O campo state não pode estar vazio' })
  @ApiProperty({
    example: 'SP',
    required: true,
    description: 'Estado do endereço',
    format: 'string',
  })
  state!: string;

  @IsString({ message: 'O campo zipCode deve ser uma string' })
  @Length(8, 8, { message: 'O campo zipCode deve ter exatamente 8 caracteres' })
  @IsNotEmpty({ message: 'O campo zipCode não pode estar vazio' })
  @ApiProperty({
    example: '01311300',
    required: true,
    description: 'Código postal (CEP) do endereço',
    format: 'string',
  })
  zipCode!: string;
}

export class CreateGntClientDto {
  @IsString({ message: 'O campo fullName deve ser uma string' })
  @IsNotEmpty({ message: 'O campo fullName não pode estar vazio' })
  @ApiProperty({
    example: 'John Doe',
    required: true,
    description: 'Nome completo do cliente',
    format: 'string',
  })
  fullName!: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @ApiProperty({
    example: 'johndoe@example.com',
    required: true,
    description: 'Endereço de e-mail do cliente',
    format: 'email',
  })
  email!: string;

  @IsString({ message: 'O campo phone deve ser uma string' })
  @Matches(/^(\+\d{1,3}\s?)?(\d{8,15})$/, {
    message: 'Formato de telefone inválido. Use o formato internacional.',
  })
  @ApiProperty({
    example: '+55 11987654321',
    required: true,
    description: 'Número de telefone do cliente em formato internacional',
    format: 'string',
  })
  phone!: string;

  @IsDateString(
    {},
    { message: 'O campo birthDate deve estar no formato YYYY-MM-DD' },
  )
  @IsNotEmpty({ message: 'O campo birthDate não pode estar vazio' })
  @ApiProperty({
    example: '1990-05-15',
    required: true,
    description: 'Data de nascimento do cliente',
    format: 'date',
  })
  birthDate!: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateGntAddressDto)
  @ApiProperty({
    type: CreateGntAddressDto,
    description: 'Endereço do cliente (opcional)',
    required: false,
  })
  address?: CreateGntAddressDto;
}
