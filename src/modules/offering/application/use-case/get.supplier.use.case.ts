import { Inject, Injectable } from '@nestjs/common';
import { Supplier } from '../../domain/entity/supplier.entity';
import { SupplierRepository } from '../../domain/repository/supplier.repository';
import { OfferingRepository } from '../../domain/repository/offering.repository';
import { CurrentUserService } from 'src/modules/auth/service/currenty.user.service';

@Injectable()
export class GetSupplierUseCase {
  constructor(
    @Inject('SupplierRepository') private readonly supplierRepository: SupplierRepository,
    @Inject('OfferingRepository') private readonly offeringRepository: OfferingRepository,
    private readonly currentUserService: CurrentUserService
  ) {}

  async execute(): Promise<SupplierOutputDto> {
    const currentUser = await this.currentUserService.getUser();
    const supplierId = currentUser?.id;
    if (!supplierId) {
      throw new Error("Supplier ID not provided in the current user context");
    }
    const supplier = await this.supplierRepository.findById(supplierId);
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    const offerings = await this.offeringRepository.findBySupplierId(supplierId);
    supplier.offerings = offerings;
    return SupplierOutputDto.fromDomain(supplier);
  }
}

export class OfferingOutputDto {
  id: string;
  name: string;
  description?: string;
  price?: number;
  estimatedDuration?: number;
}

export class SupplierOutputDto {
  id: string;
  name: string;
  email: string;
  phone: string
  offerings: OfferingOutputDto[];

  constructor(id: string, name: string, email: string, phone: string | undefined, offerings: OfferingOutputDto[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone ?? '';
    this.offerings = offerings;
  }

  static fromDomain(supplier: Supplier): SupplierOutputDto {
    const offerings = supplier.offerings.map(offering => ({
      id: offering.getId(),
      name: offering.getName(),
      description: offering.getDescription(),
      price: offering.getPrice(),
      estimatedDuration: offering.getEstimatedDuration(),
    }));

    return new SupplierOutputDto(
      supplier.getId(),
      supplier.getName(),
      supplier.getEmail(),
      supplier.getPhone(),
      offerings
    );
  }
}