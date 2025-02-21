import { BadRequestException, Injectable } from '@nestjs/common';
import { gntUser } from '@prisma/client';
import { GntPrismaService } from 'src/app/db/prisma/prismaService.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: GntPrismaService) {}

  public async findByEmail(email: string): Promise<gntUser> {
    try {
      // Retrieve the user from the database based on the email
      const findByEmail = await this.prismaService.gntUser.findUnique({
        where: { email },
      });

      // Throw BadRequestException if no user is found
      if (!findByEmail) {
        throw new BadRequestException(
          'Invalid credentials. Please check your email and password and try again',
        );
      }

      // Return the found user object
      return findByEmail;
    } catch (error: any) {
      // Throw a BadRequestException for any error that occurs
      throw new BadRequestException(error.message);
    }
  }
}
