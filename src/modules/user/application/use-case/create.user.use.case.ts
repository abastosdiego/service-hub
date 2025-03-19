import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository){}

    async execute (data: {name: string, email:string, password: string, phone?:string}): Promise<User> {
        let user = User.create(data.name, data.email, data.password, data.phone);
        await this.userRepository.save(user);
        return user;
    }
}