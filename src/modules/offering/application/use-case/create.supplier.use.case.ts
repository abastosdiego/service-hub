import { Inject, Injectable } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { Supplier } from "../../domain/entity/supplier.entity";
import { SupplierRepository } from "../../domain/repository/supplier.repository";

@Injectable()
export class CreateSupplierUseCase {
    constructor(
        @Inject('SupplierRepository') private readonly supplierRepository: SupplierRepository
    ) {}

    async execute(supplierData: CreateSupplierDto): Promise<Supplier> {
        const existingSupplier = await this.supplierRepository.findById(supplierData.id);
        if (existingSupplier) {
            throw new Error("Supplier already exists");
        }
        const supplier = Supplier.create(
            supplierData.id,
            supplierData.name,
            supplierData.email,
            supplierData.phone
        );
        await this.supplierRepository.save(supplier);
        return supplier;
    }
}

export class CreateSupplierDto {
    @IsString()
    @Length(1, 200)
    id: string; // The Supplier ID will be the same as the User ID.

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