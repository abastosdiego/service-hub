import { Feedback } from "./feedback.entity";

export class Customer {
    id: string; // The same user id
    feedbacksProvided: Feedback[];
    serviceHistory: ServiceRequest[];
}