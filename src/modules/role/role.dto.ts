import { UserRole } from 'src/core/enums/user-role.enum';

export class RuleDto {
  readonly name: UserRole;
  readonly alias: string;
}
