import { Feedback } from "./feedback.entity";
import { Service } from "./service.entity";

export class Supplier {
    id: string; // The same user id
    servicesOffered: Service[];
    feedbackReceived: Feedback[];
    //areasServed: string[]; // Neighborhoods or areas served
    //averageRating: number; // Average rating based on reviews
}