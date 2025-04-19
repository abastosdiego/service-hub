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

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SupplierTypeORMEntity,
            OfferingTypeORMEntity
        ])
    ],
    controllers: [OfferingController],
    providers: [
        {
            provide: 'SupplierRepository',
            useClass: SupplierTypeORMRepository
        },
        {
            provide: 'OfferingRepository',
            useClass: OfferingTypeORMRepository,
        },
        CreateSupplierUseCase,
        CreateOfferingUseCase,
        UserCreatedListener
    ],
    exports: []
})
export class OfferingModule {}
