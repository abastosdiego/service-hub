import { Inject, Injectable } from "@nestjs/common";
import { Offering } from "../../domain/entity/offering.entity";
import { OfferingRepository } from "../../domain/repository/offering.repository";
import { SupplierRepository } from "../../domain/repository/supplier.repository";

@Injectable()
export class CreateOfferingUseCase {
  constructor(
    @Inject('OfferingRepository') private readonly offeringRepository: OfferingRepository,
    @Inject('SupplierRepository') private readonly supplierRepository: SupplierRepository
  ) {}

  async execute(data: {
    supplierId: string;
    name: string;
    description?: string;
    price?: number;
    estimatedDuration?: number;
  }): Promise<Offering> {
    const supplier = await this.supplierRepository.findById(data.supplierId);
    if (!supplier) {
        throw new Error("Supplier not exists");
    }
    const offering = Offering.create(
      data.supplierId,
      data.name,
      data.description,
      data.price,
      data.estimatedDuration,
    );
    await this.offeringRepository.save(offering);
    return offering;
  }
}