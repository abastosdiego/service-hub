import { Inject, Injectable } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { CryptoService } from "../service/crypto.service";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        private readonly cryptoService: CryptoService
    ) {}

    async execute(data: CreateUserDto): Promise<User> {
        if (await this.userRepository.findByEmail(data.email)) {
            throw new Error("Email already exists");
        }
        if (data.password) {
            data.password = await this.cryptoService.hashPassword(data.password);
        }
        let user = User.create(data.name, data.email, data.password, data.phone);
        await this.userRepository.save(user);
        return user;
    }
}

export class CreateUserDto {
    @IsString()
    @Length(1, 200)
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @Length(6, 200)
    password?: string;

    @IsOptional()
    @IsString()
    @Length(10, 20)
    phone?: string;
}