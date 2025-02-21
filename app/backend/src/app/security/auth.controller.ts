import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorator/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interface/authRequestLocalStrategy.interface';
import { LoginResponse } from './interface/loginSucess.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Route used to log in to the application.',
    description:
      'Route used to log in and return the JWT used to authenticate the application.',
    tags: ['Auth'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
      default: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvbmggRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInN1YiI6ImEzYmE0MmQ1LWZmNTktNGI4Yy04MzIyLWFiNDM1NjA1YTdkOSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzE1MDE2NzgzLCJleHAiOjE3MTUxMDMxODN9.oqCHyOmeixuQ7cqU66fKpSwRidPazZ90NFjLaLOVoos',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
      default: [
        {
          statusCode: 401,
          error: 'Bad Request',
          message:
            'Invalid credentials. Please check your email and password and try again',
        },
      ],
    },
  })
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signInPass(@Req() request: AuthRequest): Promise<LoginResponse> {
    return await this.authService.login(request.user);
  }
}
