import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-case/create.user.use.case';
import { DeleteUserUseCase } from './application/use-case/delete.user.use.case';
import { GetUserByIdUseCase } from './application/use-case/get.user.by.id.use.case';
import { ListUsersdUseCase } from './application/use-case/list.users.use.case';
import { UpdateUserUseCase } from './application/use-case/update.user.use.case';
import { UserController } from './infra/controller/user.controller';
import { UserMemoryRepository } from './infra/repository/user.memory.repository';

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserMemoryRepository
        },
        ListUsersdUseCase,
        GetUserByIdUseCase,
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase
    ]
})
export class UserModule {}
