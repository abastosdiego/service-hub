import { Offering } from "../entity/offering.entity";

export interface OfferingRepository {
    findById(id: string): Promise<Offering | null>;
    save(offering: Offering): Promise<void>;
    list(): Promise<Offering[]>;
    delete(id: string): Promise<void>;
    getBySupplierId(supplierId: string): Promise<Offering[]>;
}