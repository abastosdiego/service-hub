import { Feedback } from "./feedback.entity";
import { Offering } from "./offering.entity";

export class Supplier {
    id: string; // The same user id
    offerings: Offering[];
    feedbackReceived: Feedback[];
    //areasServed: string[]; // Neighborhoods or areas served
    //averageRating: number; // Average rating based on reviews
}