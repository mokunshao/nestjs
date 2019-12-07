import { PermissionInterface } from '../interfaces/permission.interface';
import { SetMetadata } from '@nestjs/common';

export const Permission = (...permissions: Array<Partial<PermissionInterface>>) => SetMetadata('permissions', permissions);
