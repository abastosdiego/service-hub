import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

export class UserMemoryRepository implements UserRepository {
    private users: User[] = [];
    
    async save(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.getId() === user.getId());
        if (index !== -1) {
            this.users[index] = user;
        } else {
            this.users.push(user);
        }
    }

    async list(): Promise<User[]> {
        return this.users;
    }
    
    async findById(id: string): Promise<User | null> {
        return this.users.find(u => u.getId() === id) || null;
    }
    
    async delete(id: string): Promise<void> {
        this.users = this.users.filter(u => u.getId() !== id);
    }
}