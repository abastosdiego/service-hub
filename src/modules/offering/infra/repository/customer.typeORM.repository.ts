import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../domain/entity/customer.entity";
import { CustomerRepository } from "../../domain/repository/customer.repository";
import { CustomerTypeORMEntity } from "./typeORM-entity/customer.typeORM.entity";
import { OFFERING_DB_CONNECTION } from "../../offering.constants";

@Injectable()
export class CustomerTypeORMRepository implements CustomerRepository {
    constructor(
        @InjectRepository(CustomerTypeORMEntity, OFFERING_DB_CONNECTION)
        private readonly customerRepository: Repository<CustomerTypeORMEntity>
    ) {}

    async save(customer: Customer): Promise<void> {
        const customerData = this.domainEntityToTypeORMEntity(customer);
        await this.customerRepository.save(customerData);
    }

    async list(): Promise<Customer[]> {
        const customers = (await this.customerRepository.find()).map((customerData) => {
            return this.typeORMEntityToDomainEntity(customerData);
        });
        return customers;
    }

    async findById(id: string): Promise<Customer | null> {
        const customerData = await this.customerRepository.findOneBy({ id: id });
        if (!customerData) {
            return null;
        }
        return this.typeORMEntityToDomainEntity(customerData);
    }

    async delete(id: string): Promise<void> {
        await this.customerRepository.delete(id);
    }

    private typeORMEntityToDomainEntity(customerData: CustomerTypeORMEntity): Customer {
        return Customer.populate(
            customerData.id,
            customerData.name,
            customerData.email,
            customerData.phone
        );
    }

    private domainEntityToTypeORMEntity(customer: Customer): CustomerTypeORMEntity {
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            phone: customer.getPhone() ?? ''
        };
    }
}