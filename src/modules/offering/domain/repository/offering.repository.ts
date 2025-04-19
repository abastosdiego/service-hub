import { Offering } from "../entity/offering.entity";

export interface OfferingRepository {
  findById(id: string): Promise<Offering | null>;
  findBySupplierId(supplierId: string): Promise<Offering[]>;
  save(offering: Offering): Promise<void>;
  list(): Promise<Offering[]>;
  delete(id: string): Promise<void>;
}