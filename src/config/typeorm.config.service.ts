import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { OfferingTypeORMEntity } from "src/modules/offering/infra/repository/typeORM-entity/offering.typeORM.entity";
import { SupplierTypeORMEntity } from "src/modules/offering/infra/repository/typeORM-entity/supplier.typeORM.entity";
import { UserTypeORMEntity } from "src/modules/user/infra/repository/typeORM-entity/user.typeORM.entity";

@Injectable()
export class TypeORMConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [UserTypeORMEntity, SupplierTypeORMEntity, OfferingTypeORMEntity],
            synchronize: true,
            dropSchema: true
        }
    }
}