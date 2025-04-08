import { Supplier } from "../entity/supplier.entity";

export interface SupplierRepository {
    findById(id: string): Promise<Supplier | null>;
    save(supplier: Supplier): Promise<void>;
    list(): Promise<Supplier[]>;
    delete(id: string): Promise<void>;
}