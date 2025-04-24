import { Module } from '@nestjs/common';
import { SupplierTypeORMRepository } from './infra/repository/supplier.typeORM.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierTypeORMEntity } from './infra/repository/typeORM-entity/supplier.typeORM.entity';
import { UserCreatedListener } from './application/listener/user.created.listener';
import { CreateSupplierUseCase } from './application/use-case/create.supplier.use.case';
import { OfferingTypeORMEntity } from './infra/repository/typeORM-entity/offering.typeORM.entity';
import { OfferingTypeORMRepository } from './infra/repository/offering.typeORM.repository';
import { OfferingController } from './infra/controller/offering.controller';
import { CreateOfferingUseCase } from './application/use-case/create.offering.use.case';
import { GetSupplierByIdUseCase } from './application/use-case/get.supplier.by.id.use.case';
import { SupplierController } from './infra/controller/supplier.controller';
import { OfferingTypeORMConfigService } from './offering.typeORM.config.service';
import { OFFERING_DB_CONNECTION } from './offering.constants';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: OFFERING_DB_CONNECTION,
            useClass: OfferingTypeORMConfigService,
        }),
        TypeOrmModule.forFeature(
            [SupplierTypeORMEntity, OfferingTypeORMEntity], OFFERING_DB_CONNECTION,
        ),
    ],
    controllers: [
        OfferingController,
        SupplierController
    ],
    providers: [
        {
            provide: 'SupplierRepository',
            useClass: SupplierTypeORMRepository
        },
        {
            provide: 'OfferingRepository',
            useClass: OfferingTypeORMRepository,
        },
        UserCreatedListener,
        CreateSupplierUseCase,
        CreateOfferingUseCase,
        GetSupplierByIdUseCase
    ],
    exports: []
})
export class OfferingModule {}
