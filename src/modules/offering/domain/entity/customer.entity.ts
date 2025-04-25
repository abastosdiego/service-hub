import { Feedback } from "./feedback.entity";

export class Customer {
    feedbacks: Feedback[];
    requestHistory: Request[];

    private constructor(
        private id: string,
        private name: string,
        private email: string,
        private phone?: string) {
        this.feedbacks = [];
        this.requestHistory = [];
    }

    public static create(id: string, name: string, email: string, phone?: string): Customer {
        return new Customer(id, name, email, phone);
    }
    
    public static populate(id: string, name: string, email: string, phone?: string): Customer {
        return new Customer(id, name, email, phone);
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