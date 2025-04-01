import { v4 as uuidv4 } from 'uuid';

export class User {
    private constructor(
        private id: string,
        private name: string,
        private email: string,
        private password?: string,
        private phone?: string
    ) {}

    public static create(name: string, email: string, password?: string, phone?: string) {
        const id = uuidv4();
        return new User(id, name, email, password, phone);
    }

    public static populate(id: string, name: string, email: string, password?: string, phone?: string) {
        return new User(id, name, email, password, phone);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string | undefined {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getPhone(): string | undefined {
        return this.phone;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }
}