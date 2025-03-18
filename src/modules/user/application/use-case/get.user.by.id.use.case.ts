import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não contrado!");
        }
        return user;
    }
}