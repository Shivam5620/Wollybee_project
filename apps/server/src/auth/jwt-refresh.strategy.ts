import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IRefreshJwtPayload } from '@repo/ui/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: IRefreshJwtPayload) {
    const user = await this.userService.findOne({
      where: { id: payload.id },
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
