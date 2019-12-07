import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../interfaces/permission.interface';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  async validatePermissions(
    permissions: PermissionInterface[],
    user: User,
  ) {
    const results = permissions.map(async (permission) => {
      const { role } = permission;
      let hasRole: boolean;

      if (role) {
        hasRole = user.roles.some(r => r.name === role);
      }

      return hasRole;
    });
    return Promise.all(results);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.get('permissions', context.getHandler());
    const results = await this.validatePermissions(permissions, request.user);
    return results.includes(true);
  }
}
