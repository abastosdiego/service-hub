import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute (data: {id: string, name: string, phone?:string}): Promise<User> {

        let user = await this.userRepository.findById(data.id);
        user.setName(data.name);
        if (data.phone) {
            user.setPhone(data.phone);
        }
        await this.userRepository.save(user);
        return user;
    }
}