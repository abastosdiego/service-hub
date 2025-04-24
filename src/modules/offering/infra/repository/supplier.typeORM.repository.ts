import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Supplier } from "../../domain/entity/supplier.entity";
import { SupplierRepository } from "../../domain/repository/supplier.repository";
import { SupplierTypeORMEntity } from "./typeORM-entity/supplier.typeORM.entity";
import { OFFERING_DB_CONNECTION } from "../../offering.constants";

@Injectable()
export class SupplierTypeORMRepository implements SupplierRepository {
    constructor(
        @InjectRepository(SupplierTypeORMEntity, OFFERING_DB_CONNECTION)
        private readonly supplierRepository: Repository<SupplierTypeORMEntity>
    ) {}

    async save(supplier: Supplier): Promise<void> {
        const supplierData = this.domainEntityToTypeORMEntity(supplier);
        await this.supplierRepository.save(supplierData);
    }

    async list(): Promise<Supplier[]> {
        const suppliers = (await this.supplierRepository.find()).map((supplierData) => {
            return this.typeORMEntityToDomainEntity(supplierData);
        });
        return suppliers;
    }

    async findById(id: string): Promise<Supplier | null> {
        const supplierData = await this.supplierRepository.findOneBy({ id: id });
        if (!supplierData) {
            return null;
        }
        return this.typeORMEntityToDomainEntity(supplierData);
    }

    async delete(id: string): Promise<void> {
        await this.supplierRepository.delete(id);
    }

    private typeORMEntityToDomainEntity(supplierData: SupplierTypeORMEntity): Supplier {
        return Supplier.populate(
            supplierData.id,
            supplierData.name,
            supplierData.email,
            supplierData.phone
        );
    }

    private domainEntityToTypeORMEntity(supplier: Supplier): SupplierTypeORMEntity {
        return {
            id: supplier.getId(),
            name: supplier.getName(),
            email: supplier.getEmail(),
            phone: supplier.getPhone() ?? ''
        };
    }
}