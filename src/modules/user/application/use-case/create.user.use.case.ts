import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute (data: {name: string, email:string, password: string, phone?:string}): Promise<User> {
        let user = User.create(data.name, data.email, data.password, data.phone);
        await this.userRepository.save(user);
        return user;
    }
}