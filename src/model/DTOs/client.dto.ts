import {
  Length,
  IsEmail,
  IsBoolean,
  IsStrongPassword,
  IsString,
  ArrayMinSize,
  MaxLength,
  ValidateNested,
  IsEnum,
} from "class-validator";
import { Exclude, Type } from "class-transformer";

import PhotoDTO from "./photo.dto";
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

  @IsEnum(IRoles)
  role: string;

  @IsBoolean()
  active: boolean;
}

export default class ClientDTO extends UserDTO {
  @IsString()
  avatar: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: "at least one photo should be present" })
  @Type(() => PhotoDTO)
  photos: PhotoDTO[];
}
