import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SupplierTypeORMEntity } from './infra/repository/typeORM-entity/supplier.typeORM.entity';
import { OfferingTypeORMEntity } from './infra/repository/typeORM-entity/offering.typeORM.entity';

@Injectable()
export class OfferingTypeORMConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('OFFERING_DB_HOST'),
      port: this.configService.get<number>('OFFERING_DB_PORT'),
      username: this.configService.get<string>('OFFERING_DB_USERNAME'),
      password: this.configService.get<string>('OFFERING_DB_PASSWORD'),
      database: this.configService.get<string>('OFFERING_DB_DATABASE'),
      entities: [SupplierTypeORMEntity, OfferingTypeORMEntity],
      synchronize: true,
      dropSchema: true,
      logging: true,
    };
  }
}