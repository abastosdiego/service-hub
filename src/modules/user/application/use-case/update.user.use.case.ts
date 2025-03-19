import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class UpdateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository){}

    async execute (id: string, data: {name: string, phone?:string}): Promise<User> {

        let user = await this.userRepository.findById(id);
        if(!user) throw new Error('Usuário não encontrado');
        user.setName(data.name);
        if (data.phone) {
            user.setPhone(data.phone);
        }
        await this.userRepository.save(user);
        return user;
    }
}