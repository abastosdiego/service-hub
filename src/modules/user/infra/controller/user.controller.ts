import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { CreateUserDto, CreateUserUseCase } from "../../application/use-case/create.user.use.case";
import { DeleteUserUseCase } from "../../application/use-case/delete.user.use.case";
import { GetUserByIdUseCase } from "../../application/use-case/get.user.by.id.use.case";
import { ListUsersUseCase } from "../../application/use-case/list.users.use.case";
import { UpdateUserUseCase } from "../../application/use-case/update.user.use.case";

@Controller('/users')
export class UserController {
    constructor(
        private listUsersUseCase: ListUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async list() {
        return this.listUsersUseCase.execute();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getById(@Param('id') id: string) {
        return await this.getUserByIdUseCase.execute(id);
    }

    @Post()
    async create(@Body() userData: CreateUserDto) {
        const user = await this.createUserUseCase.execute(userData);
        return { id: user.getId(), message: `created successfully!` };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() userData: any) {
        await this.updateUserUseCase.execute(id, userData);
        return { message: `updated successfully!` };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id);
        return { message: `deleted successfully!` };
    }
}