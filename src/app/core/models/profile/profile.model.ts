import { Roles } from '../../enums/role/role.enum';

export interface Profile {
  role: Roles;
  name: string | null;
  email: string;
}
