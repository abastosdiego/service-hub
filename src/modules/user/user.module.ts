import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/use-case/create.user.use.case';
import { DeleteUserUseCase } from './application/use-case/delete.user.use.case';
import { GetUserByIdUseCase } from './application/use-case/get.user.by.id.use.case';
import { ListUsersdUseCase } from './application/use-case/list.users.use.case';
import { UpdateUserUseCase } from './application/use-case/update.user.use.case';
import { UserController } from './infra/controller/user.controller';
import { UserTypeORMEntity } from './infra/repository/typeORM-entity/user.typeORM.entity';
import { UserTypeORMRepository } from './infra/repository/user.typeORM.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserTypeORMEntity])],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserTypeORMRepository
        },
        ListUsersdUseCase,
        GetUserByIdUseCase,
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase
    ]
})
export class UserModule {}
