import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class GetUserByEmailUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository){}

    async execute(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}