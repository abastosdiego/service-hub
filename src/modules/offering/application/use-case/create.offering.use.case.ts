import { Inject, Injectable } from "@nestjs/common";
import { Offering } from "../../domain/entity/offering.entity";
import { OfferingRepository } from "../../domain/repository/offering.repository";
import { SupplierRepository } from "../../domain/repository/supplier.repository";
import { IsString, IsOptional, IsNumber, IsUUID, Length, Min } from 'class-validator';
import { CurrentUserService } from "src/modules/auth/service/currenty.user.service";

@Injectable()
export class CreateOfferingUseCase {
  constructor(
    @Inject('OfferingRepository') private readonly offeringRepository: OfferingRepository,
    @Inject('SupplierRepository') private readonly supplierRepository: SupplierRepository,
    private readonly currentUserService: CurrentUserService
  ) {}

  async execute(data: CreateOfferingDto): Promise<Offering> {
    const currentUser = await this.currentUserService.getUser();
    const supplierId = currentUser?.id;
    if (!supplierId) {
      throw new Error("Supplier ID not provided in the current user context");
    }
    const supplier = await this.supplierRepository.findById(supplierId);
    if (!supplier) {
        throw new Error("Supplier not exists");
    }
    const offering = Offering.create(
      supplierId,
      data.name,
      data.description,
      data.price,
      data.estimatedDuration,
    );
    await this.offeringRepository.save(offering);
    return offering;
  }
}

export class CreateOfferingDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedDuration?: number;
}