import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import {
  IJwtPayload,
  IRefreshJwtPayload,
  ISignInResponseBody,
} from '@repo/ui/types';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async login(signInDto: SignInDto): Promise<ISignInResponseBody> {
    const { email, password } = signInDto;
    const user = await this.userService.findOne({
      where: { email },
    });

    if (user && (await user.validatePassword(password))) {
      console.log('User validated');
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    delete user.password;
    delete user.salt;
    delete user.role;

    return {
      accessToken,
      refreshToken,
    };
  }

  getUserPermissions(user: User): string[] {
    // Generate permissions array
    const permissions: string[] = [];
    for (const rolePermission of user.role.rolePermissions) {
      for (const allowedPermission of rolePermission.allowedPermissions) {
        permissions.push(
          `${allowedPermission}:${rolePermission.permission.module}:${rolePermission.permission.feature}`,
        );
      }
    }

    return [...new Set(permissions)];
  }

  generateAccessToken(user: User): string {
    const permissions = this.getUserPermissions(user);
    delete user.role;
    const payload: IJwtPayload = {
      user: { ...user },
      permissions,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  generateRefreshToken(user: User): string {
    const payload: IRefreshJwtPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
  }
}
