import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class ListUsersUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository){}

    async execute(): Promise<User[]> {
        return await this.userRepository.list();
    }
}