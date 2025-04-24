import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Offering } from "../../domain/entity/offering.entity";
import { OfferingRepository } from "../../domain/repository/offering.repository";
import { OfferingTypeORMEntity } from "./typeORM-entity/offering.typeORM.entity";
import { OFFERING_DB_CONNECTION } from "../../offering.constants";

@Injectable()
export class OfferingTypeORMRepository implements OfferingRepository {
  constructor(
    @InjectRepository(OfferingTypeORMEntity, OFFERING_DB_CONNECTION)
    private readonly offeringRepository: Repository<OfferingTypeORMEntity>,
  ) {}

  async findById(id: string): Promise<Offering | null> {
    const offeringData = await this.offeringRepository.findOneBy({ id });
    if (!offeringData) {
      return null;
    }
    return this.typeORMEntityToDomainEntity(offeringData);
  }

  async findBySupplierId(supplierId: string): Promise<Offering[]> {
    const offeringsData = await this.offeringRepository.findBy({ supplierId });
    return offeringsData.map(this.typeORMEntityToDomainEntity);
  }

  async save(offering: Offering): Promise<void> {
    const offeringData = this.domainEntityToTypeORMEntity(offering);
    await this.offeringRepository.save(offeringData);
  }

  async list(): Promise<Offering[]> {
    const offeringsData = await this.offeringRepository.find();
    return offeringsData.map(this.typeORMEntityToDomainEntity);
  }

  async delete(id: string): Promise<void> {
    await this.offeringRepository.delete(id);
  }

  private typeORMEntityToDomainEntity(offeringData: OfferingTypeORMEntity): Offering {
    return Offering.populate(
      offeringData.id,
      offeringData.supplierId,
      offeringData.name,
      offeringData.description,
      offeringData.price,
      offeringData.estimatedDuration,
    );
  }

  private domainEntityToTypeORMEntity(offering: Offering): OfferingTypeORMEntity {
    return {
      id: offering.getId(),
      supplierId: offering.getSupplierId(),
      name: offering.getName(),
      description: offering.getDescription(),
      price: offering.getPrice(),
      estimatedDuration: offering.getEstimatedDuration(),
    };
  }
}