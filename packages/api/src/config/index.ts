import fs from "fs";
import _ from 'lodash';
import path from "path";

import { ConfigModuleOptions, ConfigFactory, ConfigObject } from '@nestjs/config';

import { IsInstance, ValidateNested, validateSync } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";

import defaultSettings from '@/settings.json';

import { APIConfig } from "./api.config";
import { DBConfig } from "./db.config";


export * from './api.config'
export * from './db.config'

export class Config{
  @IsInstance(APIConfig)
  @ValidateNested()
  api: APIConfig;

  @IsInstance(DBConfig)
  @ValidateNested()
  db: DBConfig;
}


function getSettingsJson(){
  try {
    const settingsJsonPath = path.join(process.cwd(), 'settings.json');
    const settingsJsonString = fs.readFileSync(settingsJsonPath, {encoding: 'utf-8'});

    const settingsJson = JSON.parse(settingsJsonString);

    return _.merge(defaultSettings, settingsJson);
  } catch (error) {
    return defaultSettings;
  }
}

function loadJsonFactory<T>(constructor: ClassConstructor<T>, config: Record<string, unknown>): () => T {
  function loadJson(){
    const validatedConfig = plainToInstance(constructor, config, {enableImplicitConversion: true});
    const errors = validateSync(validatedConfig as Record<string, unknown>,{skipMissingProperties: false});

    if(errors.length > 0) throw new Error(errors.toString());

    return validatedConfig;
  }

  return loadJson;
}

function getConfigModuleOptions<T>(
  configClass: ClassConstructor<T>,
  configJson: Record<string, unknown>
): ConfigModuleOptions {
  return {
    isGlobal: true,
    ignoreEnvVars: true,
    load:[loadJsonFactory(configClass, configJson) as ConfigFactory<ConfigObject>]
  }
}

export const configModuleOptions = getConfigModuleOptions(Config, getSettingsJson());
