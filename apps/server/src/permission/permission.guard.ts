import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_METADATA_KEY } from '@repo/ui/lib/constants';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || [];
    const requiredPermissions =
      this.reflector.get<string[]>(
        PERMISSION_METADATA_KEY,
        context.getHandler(),
      ) || [];
    const hasAllRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    // console.log({
    //   userPermissions,
    //   requiredPermissions,
    //   hasAllRequiredPermissions,
    // });

    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      return true;
    }

    throw new ForbiddenException('Insufficient Permissions');
  }
}
