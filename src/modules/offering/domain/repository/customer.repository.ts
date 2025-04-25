import { Customer } from "../entity/customer.entity";

export interface CustomerRepository {
    findById(id: string): Promise<Customer | null>;
    save(customer: Customer): Promise<void>;
    list(): Promise<Customer[]>;
    delete(id: string): Promise<void>;
}