import { IsUrl, IsString } from "class-validator";

export default class PhotoDTO {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}
