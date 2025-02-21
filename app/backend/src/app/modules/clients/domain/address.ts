import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class AddressObject {
  constructor(
    readonly id: string,
    readonly street: string,
    readonly number: string,
    readonly city: string,
    readonly state: string,
    readonly zipCode: string,
    readonly clientId: string,
  ) {}

  static create(
    options: Partial<Omit<AddressObject, 'id'>> = {},
  ): AddressObject {
    if (
      !options.street ||
      !options.number ||
      !options.city ||
      !options.state ||
      !options.zipCode ||
      !options.clientId
    ) {
      throw new Error(
        'Os campos fullName, email, phone, birthDate e createdById são obrigatórios.',
      );
    }

    return new AddressObject(
      uuidv4(),
      options.street,
      options.number,
      options.city,
      options.state,
      options.zipCode,
      options.clientId,
    );
  }
}
