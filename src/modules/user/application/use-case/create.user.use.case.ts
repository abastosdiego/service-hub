import { Inject, Injectable } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

    async execute(data: CreateUserDto): Promise<User> {
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