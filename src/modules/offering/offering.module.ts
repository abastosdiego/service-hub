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
import { SupplierController } from './infra/controller/supplier.controller';
import { OfferingTypeORMConfigService } from './offering.typeORM.config.service';
import { OFFERING_DB_CONNECTION } from './offering.constants';
import { CustomerTypeORMEntity } from './infra/repository/typeORM-entity/customer.typeORM.entity';
import { CustomerTypeORMRepository } from './infra/repository/customer.typeORM.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { GetSupplierUseCase } from './application/use-case/get.supplier.use.case';
import { CustomerController } from './infra/controller/customer.controller';
import { GetCustomerUseCase } from './application/use-case/get.customer.use.case';
import { CreateCustomerUseCase } from './application/use-case/create.customer.use.case';

@Module({
    imports: [
        AuthModule,
        UserModule,
        TypeOrmModule.forRootAsync({
            name: OFFERING_DB_CONNECTION,
            useClass: OfferingTypeORMConfigService,
        }),
        TypeOrmModule.forFeature(
            [SupplierTypeORMEntity, OfferingTypeORMEntity, CustomerTypeORMEntity], OFFERING_DB_CONNECTION,
        ),
    ],
    controllers: [
        OfferingController,
        SupplierController,
        CustomerController
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
        {
            provide: 'CustomerRepository',
            useClass: CustomerTypeORMRepository
        },
        UserCreatedListener,
        CreateSupplierUseCase,
        CreateOfferingUseCase,
        CreateCustomerUseCase,
        GetSupplierUseCase,
        GetCustomerUseCase
    ],
    exports: []
})
export class OfferingModule {}
