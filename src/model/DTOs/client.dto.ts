import { Length, IsEmail, IsEnum, IsBoolean, IsStrongPassword, IsUrl } from "class-validator";
import { Exclude } from "class-transformer";

import { IRoles } from "model/types/common";

class UserDTO {
  @Length(2, 25)
  firstName: string;

  @Length(2, 25)
  lastName: string;

  @Exclude()
  fullName: string;

  @IsEmail()
  email: string;

  @Length(6, 50)
  @IsStrongPassword({ minNumbers: 1 })
  password: string;

  @IsEnum({ enum: IRoles })
  role: string;

  @IsBoolean()
  active: boolean;
}

export default class ClientDTO extends UserDTO {
  @IsUrl()
  avatar: string;
}
