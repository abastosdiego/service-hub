import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserTypeORMEntity } from './infra/repository/typeORM-entity/user.typeORM.entity';

@Injectable()
export class UserTypeORMConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options = {
      type: 'postgres' as const,
      host: this.configService.get<string>('USER_DB_HOST'),
      port: this.configService.get<number>('USER_DB_PORT'),
      username: this.configService.get<string>('USER_DB_USERNAME'),
      password: this.configService.get<string>('USER_DB_PASSWORD'),
      database: this.configService.get<string>('USER_DB_DATABASE'),
      entities: [UserTypeORMEntity],
      synchronize: true,
      dropSchema: true,
      logging: true,
    };
    console.log('User TypeORM Config:', options);
    return options;
  }
}