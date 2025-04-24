import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../domain/entity/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserTypeORMEntity } from "./typeORM-entity/user.typeORM.entity";
import { USER_DB_CONNECTION } from "../../user.constants";

@Injectable()
export class UserTypeORMRepository implements UserRepository {

    constructor(
        @InjectRepository(UserTypeORMEntity, USER_DB_CONNECTION)
        private readonly userRepository: Repository<UserTypeORMEntity>
    ) {}

    async save(user: User): Promise<void> {
        const userData = this.domainEntityToTypeORMEntity(user);
        await this.userRepository.save(userData);
    }

    async list(): Promise<User[]> {
        const users = (await this.userRepository.find()).map((userData) => {
            return this.typeORMEntityToDomainEntity(userData);
        });
        return users;
    }
    
    async findById(id: string): Promise<User | null> {
        const userData = await this.userRepository.findOneBy({ id: id });
        if (!userData) {
            throw new Error('Usuário não encontrado!');
        }
        return this.typeORMEntityToDomainEntity(userData);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.userRepository.findOneBy({ email: email });
        if (!userData) {
            return null;
        }
        return this.typeORMEntityToDomainEntity(userData);
    }
    
    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    private typeORMEntityToDomainEntity(userData: UserTypeORMEntity): User {
        return User.populate(
            userData.id,
            userData.name,
            userData.email,
            userData.password,
            userData.phone
        );
    }

    private domainEntityToTypeORMEntity(user: User): any {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            phone: user.getPhone()
        };
    }
}