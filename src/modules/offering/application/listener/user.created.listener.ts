import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateSupplierUseCase } from "../use-case/create.supplier.use.case";

@Injectable()
export class UserCreatedListener {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase
  ) {}

  @OnEvent('user.created')
  async handle(event: { userId: string; email: string; name: string, phone: string | undefined }): Promise<void> {
    const { userId, email, name, phone } = event;
    await this.createSupplierUseCase.execute({ id: userId, email, name, phone });
    console.log(`Supplier criado para o usuário: ${email}`);
  }
}