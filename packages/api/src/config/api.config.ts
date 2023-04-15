import { IsNumber, IsPositive, IsPort, IsNotEmpty, IsString, IsUrl, IsInstance, ValidateNested } from "class-validator";
import { CacheModuleOptions, CacheModuleAsyncOptions } from "@nestjs/common";
import { ThrottlerModuleOptions, ThrottlerAsyncOptions } from "@nestjs/throttler";
import { ConfigService, ConfigModule } from "@nestjs/config";


export class APICacheConfig implements CacheModuleOptions{
  @IsNumber()
  @IsPositive()
  max: number;

  @IsNumber()
  @IsPositive()
  ttl: number;
}

export class APIThrottlerConfig implements ThrottlerModuleOptions{
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsPositive()
  ttl: number;
}

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

  @IsInstance(APICacheConfig)
  @ValidateNested()
  cache: APICacheConfig;

  @IsInstance(APIThrottlerConfig)
  @ValidateNested()
  throttler: APIThrottlerConfig;
}


export const throttlerModuleOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject:[ConfigService],
  useFactory: (configService: ConfigService) => configService.get('api.throttler')!
}

export const cacheModuleOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  inject:[ConfigService],
  useFactory: (configService: ConfigService) => {
    const cacheConfig = configService.get<CacheModuleOptions>('api.cache')!

    return {isGlobal: true, ...cacheConfig};
  }
}
