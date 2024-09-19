import { Roles } from './roles';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: Roles;
  user:{
    id: number;
    name: string;
    email: string;
    rol: Roles;
    phone: string;
    active: number;
  }
}
