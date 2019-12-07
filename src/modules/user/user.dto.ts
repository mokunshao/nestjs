import { Role } from '../role/role.entity';

export class UserDto {
  readonly name: string;
  readonly password: string;
  roles: Role[];
}
