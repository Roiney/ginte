import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class ClientObject {
  constructor(
    readonly id: string,
    readonly fullName: string,
    readonly email: string,
    readonly phone: string,
    readonly birthDate: string,
    readonly address: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
    readonly createdById?: string | null,
    readonly canceledAt?: Date | null,
    readonly modifyById?: string | null,
  ) {}

  static create(options: Partial<Omit<ClientObject, 'id'>> = {}): ClientObject {
    if (
      !options.fullName ||
      !options.email ||
      !options.phone ||
      !options.birthDate ||
      !options.address
    ) {
      throw new Error(
        'Os campos fullName, email, phone e birthDate são obrigatórios.',
      );
    }

    return new ClientObject(
      uuidv4(),
      options.fullName,
      options.email,
      options.phone,
      options.birthDate,
      options.address,
      options.createdAt ?? new Date(),
      options.updatedAt ?? new Date(),
      options.createdById,
      options.canceledAt,
      options.modifyById,
    );
  }
}
