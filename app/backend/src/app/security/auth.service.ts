import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { gntUser } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserService } from '../modules/user/user.service';
import { LoginResponse } from './interface/loginSucess.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUserMail(email: string, password: string): Promise<gntUser> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException(
          'User not found or invalid credentials.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'User not found or invalid credentials.',
        );
      }

      return { ...user, password: '' };
    } catch (error: any) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }

  async validateUser(email: string): Promise<gntUser> {
    try {
      // Find the user by email
      const user = await this.userService.findByEmail(email);

      // Throw UnauthorizedException if user is not found or is inactive
      if (!user) {
        throw new UnauthorizedException(
          'User not found or invalid credentials.',
        );
      }

      // Return the validated user object
      return user;
    } catch (error: any) {
      // Handle specific exceptions
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      // Handle any other error that occurs during the validation process
      throw new BadRequestException(error.message);
    }
  }

  async login(user: gntUser): Promise<LoginResponse> {
    try {
      // Prepare JWT payload with user information
      const payload = {
        username: user.name,
        email: user.email,
        sub: user.id,
        role: user.role,
      };

      // Sign the JWT token with the payload
      const accessToken = this.jwtService.sign(payload);

      // Return an object with the access token
      return {
        access_token: accessToken,
      };
    } catch (error: any) {
      // Handle any error that occurs during the login process
      throw new BadRequestException(
        'Failed to log in. Please try again later.',
      );
    }
  }
}
