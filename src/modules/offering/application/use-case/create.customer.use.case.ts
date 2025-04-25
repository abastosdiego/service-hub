import { Inject, Injectable } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Customer } from "../../domain/entity/customer.entity";
import { CustomerRepository } from "../../domain/repository/customer.repository";

@Injectable()
export class CreateCustomerUseCase {
    constructor(
        @Inject('CustomerRepository') private readonly customerRepository: CustomerRepository
    ) {}

    async execute(customerData: CreateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findById(customerData.id);
        if (existingCustomer) {
            throw new Error("Customer already exists");
        }
        const customer = Customer.create(
            customerData.id,
            customerData.name,
            customerData.email,
            customerData.phone
        );
        await this.customerRepository.save(customer);
        return customer;
    }
}

export class CreateCustomerDto {
    @IsString()
    @Length(1, 200)
    id: string; // The Customer ID will be the same as the User ID.

    @IsString()
    @Length(1, 200)
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @Length(10, 20)
    phone?: string;
}