import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';

import { clientTypeOrmOptions } from './db';
import { cacheModuleOptions, configModuleOptions, throttlerModuleOptions } from './config';

@Module({
  imports: [
    CacheModule.register(cacheModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRootAsync(throttlerModuleOptions),
    TypeOrmModule.forRootAsync(clientTypeOrmOptions)
  ],
})
export class AppModule {}
