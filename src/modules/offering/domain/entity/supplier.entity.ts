import { Feedback } from "./feedback.entity";
import { Offering } from "./offering.entity";

export class Supplier {
    offerings: Offering[];
    feedbackReceived: Feedback[];
    //areasServed: string[]; // Neighborhoods or areas served
    //averageRating: number; // Average rating based on reviews

    private constructor(
        private id: string,
        private name: string,
        private email: string,
        private phone?: string) {
        this.offerings = [];
        this.feedbackReceived = [];
    }

    public static create(id: string, name: string, email: string, phone?: string): Supplier {
        return new Supplier(id, name, email, phone);
    }
    
    public static populate(id: string, name: string, email: string, phone?: string): Supplier {
        return new Supplier(id, name, email, phone);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string | undefined {
        return this.phone;
    }
}