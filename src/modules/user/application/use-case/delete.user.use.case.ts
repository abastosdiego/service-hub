import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository){}

    async execute (id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}