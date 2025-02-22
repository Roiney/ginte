import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

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

  @IsString({ message: 'O campo address deve ser uma string' })
  @IsOptional()
  @IsNotEmpty({ message: 'O campo address não pode estar vazio se fornecido' })
  @ApiProperty({
    example: 'Rua das Palmeiras, 123 - São Paulo, SP',
    required: false,
    description: 'Endereço do cliente',
    format: 'string',
  })
  address?: string;
}
