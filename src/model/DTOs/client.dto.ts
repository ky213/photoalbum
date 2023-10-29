import { Length, IsEmail, IsEnum, IsBoolean, IsStrongPassword, IsString, IsArray, MaxLength } from "class-validator";
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

  @MaxLength(50)
  @IsStrongPassword({ minNumbers: 1, minLength: 6, minSymbols: 0, minUppercase: 0, minLowercase: 0 })
  password: string;
  // TODO: convert to enum
  @IsString()
  role: string;

  @IsBoolean()
  active: boolean;
}

export default class ClientDTO extends UserDTO {
  @IsString()
  avatar: string;

  @IsArray({})
  photos: string;
}
