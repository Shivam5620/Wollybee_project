import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@repo/ui/types';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.userService.findOne({
      where: { id: payload.user.id },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    // Generate permissions array
    const permissions: string[] = [];
    for (const rolePermission of user.role.rolePermissions) {
      for (const allowedPermission of rolePermission.allowedPermissions) {
        permissions.push(
          `${allowedPermission}:${rolePermission.permission.module}:${rolePermission.permission.feature}`,
        );
      }
    }

    user.permissions = [...new Set(permissions)];
    return user;
  }
}
