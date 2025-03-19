import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-case/create.user.use.case";
import { DeleteUserUseCase } from "../../application/use-case/delete.user.use.case";
import { GetUserByIdUseCase } from "../../application/use-case/get.user.by.id.use.case";
import { ListUsersdUseCase } from "../../application/use-case/list.users.use.case";
import { UpdateUserUseCase } from "../../application/use-case/update.user.use.case";

@Controller('/users')
export class UserController {
    constructor(
        private listUsersUseCase: ListUsersdUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    @Get()
    async list() {
        return this.listUsersUseCase.execute();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.getUserByIdUseCase.execute(id);
    }

    @Post()
    async create(@Body() userData: any) {
        const user = await this.createUserUseCase.execute(userData);
        return { id: user.getId(), message: `created successfully!` };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userData: any) {
        await this.updateUserUseCase.execute(id, userData);
        return { message: `updated successfully!` };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id);
        return { message: `deleted successfully!` };
    }
}