import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreateUserUseCase } from './application/use-case/create.user.use.case';
import { DeleteUserUseCase } from './application/use-case/delete.user.use.case';
import { GetUserByEmailUseCase } from './application/use-case/get.user.by.email.use.case';
import { GetUserByIdUseCase } from './application/use-case/get.user.by.id.use.case';
import { ListUsersUseCase } from './application/use-case/list.users.use.case';
import { UpdateUserUseCase } from './application/use-case/update.user.use.case';
import { UserController } from './infra/controller/user.controller';
import { UserTypeORMEntity } from './infra/repository/typeORM-entity/user.typeORM.entity';
import { UserTypeORMRepository } from './infra/repository/user.typeORM.repository';
import { CryptoService } from './application/service/crypto.service';
import { GetUserByEmailAndPasswordUseCase } from './application/use-case/get.user.by.email.and.password.use.case';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserTypeORMEntity])
    ],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserTypeORMRepository
        },
        ListUsersUseCase,
        GetUserByIdUseCase,
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetUserByEmailUseCase,
        GetUserByEmailAndPasswordUseCase,
        CryptoService
    ],
    exports: [
        GetUserByEmailUseCase,
        GetUserByEmailAndPasswordUseCase,
        CreateUserUseCase,
        GetUserByIdUseCase
    ]
})
export class UserModule {}
