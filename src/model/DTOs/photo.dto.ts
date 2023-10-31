import { IsUrl, IsString, Matches, IsOptional } from "class-validator";

export default class PhotoDTO {
  @IsString()
  name: string;

  @Matches(/(png|jpg|jpeg)/i)
  extension: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  data: string;
}
