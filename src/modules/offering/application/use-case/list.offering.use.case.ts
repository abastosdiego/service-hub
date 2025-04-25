import { Inject, Injectable } from '@nestjs/common';
import { Offering } from '../../domain/entity/offering.entity';
import { OfferingRepository } from '../../domain/repository/offering.repository';

@Injectable()
export class ListOfferingsUseCase {
  constructor(
    @Inject('OfferingRepository') private readonly offeringRepository: OfferingRepository,
  ) {}

  async execute(): Promise<ListOfferingOutputDto[]> {
    const offerings = await this.offeringRepository.list();
    return offerings.map((offering) => ListOfferingOutputDto.fromEntity(offering));
  }
}

export class ListOfferingOutputDto {
  id: string;
  supplierId: string;
  name: string;
  description?: string;
  price?: number;
  estimatedDuration?: number;

  constructor(
    id: string,
    supplierId: string,
    name: string,
    description?: string,
    price?: number,
    estimatedDuration?: number,
  ) {
    this.id = id;
    this.supplierId = supplierId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.estimatedDuration = estimatedDuration;
  }

  static fromEntity(offering: Offering): ListOfferingOutputDto {
    return new ListOfferingOutputDto(
      offering.getId(),
      offering.getSupplierId(),
      offering.getName(),
      offering.getDescription(),
      offering.getPrice(),
      offering.getEstimatedDuration(),
    );
  }
}