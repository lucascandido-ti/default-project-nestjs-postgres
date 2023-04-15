import { IsInstance, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class PostgresTypeOrmConfig{

  readonly type: 'postgres' = 'postgres' as const;

  @IsString()
  @IsNotEmpty()
  host:string;

  @IsNumber()
  @IsNotEmpty()
  port:number;

  @IsString()
  @IsNotEmpty()
  database:string;

  @IsString()
  @IsNotEmpty()
  username:string;

  @IsString()
  @IsNotEmpty()
  password:string;
}

export class DBConfig{
  @IsInstance(PostgresTypeOrmConfig)
  @ValidateNested()
  client: PostgresTypeOrmConfig;
}
