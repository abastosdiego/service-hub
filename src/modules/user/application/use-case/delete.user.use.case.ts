import { UserRepository } from "../../domain/repository/user.repository";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute (id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}