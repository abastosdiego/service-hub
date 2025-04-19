import { Module } from '@nestjs/common';
import { SupplierTypeORMRepository } from './infra/repository/supplier.typeORM.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierTypeORMEntity } from './infra/repository/typeORM-entity/supplier.typeORM.entity';
import { UserCreatedListener } from './application/listener/user.created.listener';
import { CreateSupplierUseCase } from './application/use-case/create.supplier.use.case';

@Module({
    imports: [
        TypeOrmModule.forFeature([SupplierTypeORMEntity])
    ],
    controllers: [],
    providers: [
        {
            provide: 'SupplierRepository',
            useClass: SupplierTypeORMRepository
        },
        CreateSupplierUseCase,
        UserCreatedListener
    ],
    exports: []
})
export class OfferingModule {}
