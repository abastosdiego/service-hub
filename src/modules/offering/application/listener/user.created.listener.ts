import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateSupplierUseCase } from "../use-case/create.supplier.use.case";

@Injectable()
export class UserCreatedListener {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase
  ) {}

  @OnEvent('user.created')
  async handle(event: { userId: string; email: string; name: string }): Promise<void> {
    const { userId, email } = event;
    await this.createSupplierUseCase.execute({ id: userId });
    console.log(`Supplier criado para o usuário: ${email}`);
  }
}