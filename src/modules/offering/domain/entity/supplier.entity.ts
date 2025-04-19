import { Feedback } from "./feedback.entity";
import { Offering } from "./offering.entity";

export class Supplier {
    offerings: Offering[];
    feedbackReceived: Feedback[];
    //areasServed: string[]; // Neighborhoods or areas served
    //averageRating: number; // Average rating based on reviews

    private constructor(private id: string) {
        this.offerings = [];
        this.feedbackReceived = [];
    }

    public static create(id: string): Supplier {
        return new Supplier(id);
    }
    
    public static populate(id: string): Supplier {
        return new Supplier(id);
    }

    public getId(): string {
        return this.id;
    }
}