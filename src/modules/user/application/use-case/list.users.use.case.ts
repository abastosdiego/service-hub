import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

export class ListUsersdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.list();
    }
}