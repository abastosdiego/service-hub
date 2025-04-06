import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { CryptoService } from "../service/crypto.service";

@Injectable()
export class GetUserByEmailAndPasswordUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        private readonly cryptoService: CryptoService
    ){}

    async execute(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && user && user.getPassword()) {
            const storedPassword = user.getPassword() || '';
            if (await this.cryptoService.comparePassword(password, storedPassword)) {
              return user;
            }
          }
          return null;
    }
}