import { DataSourceOptions } from "typeorm";

import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { CLIENT_ENTITIES } from './entities';

type MakeTypeOrmModuleOptionsProps = {
  dataSourceName?: string;
  configPropertyPath: string;
  entities: DataSourceOptions['entities'];
}

function makeTypeOrmModuleOptions({
  dataSourceName,
  configPropertyPath,
  entities
}: MakeTypeOrmModuleOptionsProps): TypeOrmModuleAsyncOptions {
  const logging = process.env['NODE_ENV'] !== 'production';

  return {
    name: dataSourceName,
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => {
      const typeormConfig = configService.get(configPropertyPath)!;

      return {
        ...typeormConfig,
        entities,
        logging
      }
    }
  }
}

export const CLIENT_DATA_SOURCE = 'default'
export const clientTypeOrmOptions = makeTypeOrmModuleOptions({
  configPropertyPath: 'db.client',
  entities: CLIENT_ENTITIES
})
