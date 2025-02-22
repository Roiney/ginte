import { PartialType } from '@nestjs/mapped-types';
import { CreateGntClientDto } from './createClient.dto';

export class UpdateGntClientDto extends PartialType(CreateGntClientDto) {}
