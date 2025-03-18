import { User } from "../entity/user.entity";

export interface UserRepository {
    findById(id: string): Promise<User>;
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    delete(id: string): Promise<void>;
}