import { Request } from "../entity/request.entity";

export interface RequestRepository {
    findById(id: string): Promise<Request | null>;
    save(request: Request): Promise<void>;
    list(): Promise<Request[]>;
    delete(id: string): Promise<void>;
    findByCustomerId(customerId: string): Promise<Request[]>;
    findBySupplierId(supplierId: string): Promise<Request[]>;
}