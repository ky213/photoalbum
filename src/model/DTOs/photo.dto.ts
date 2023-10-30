import { IsUrl, IsString, Matches } from "class-validator";

export default class PhotoDTO {
  @IsString()
  name: string;

  @Matches(/(png|jpg|jpeg)/i)
  extension: string;

  @IsUrl()
  url: string;

  @IsString()
  data: string;
}
