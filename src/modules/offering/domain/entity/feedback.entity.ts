export class Feedback {
    id: string;
    customerId: string;
    supplierId: string;
    requestId: string;
    rating: number; // Rating (e.g., 1 to 5)
    date: Date;
    comment?: string;
}