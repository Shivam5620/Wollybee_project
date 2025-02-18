import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth-signin.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { ISignInResponseBody } from '@repo/ui/types/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and get access and refresh tokens' })
  @Post('/login')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<ISignInResponseBody> {
    return this.authService.login(signInDto);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @Post('refresh')
  async refresh(@Request() req): Promise<ISignInResponseBody> {
    const { user } = req;
    return {
      accessToken: this.authService.generateAccessToken(user),
      refreshToken: this.authService.generateRefreshToken(user),
    };
  }
}
