import { Roles } from "./common";
import { IPhoto } from "./photo";

export interface IUser {
  readonly id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password?: string;
  role: Roles;
  active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IClient extends IUser {
  avatar?: string;
  photos?: IPhoto[];
}
