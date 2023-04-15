import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

import { cacheModuleOptions, configModuleOptions, throttlerModuleOptions } from './config';

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions)
  ],
})
export class AppModule {}
