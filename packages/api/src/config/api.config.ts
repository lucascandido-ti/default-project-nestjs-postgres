import { IsPort, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class APIConfig{
  @IsUrl({protocols:['http','https'], require_tld: false})
  @IsNotEmpty()
  url: string;

  @IsPort()
  @IsString()
  port: string;

  @IsNotEmpty()
  @IsString()
  prefix: string;
}
