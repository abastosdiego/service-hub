import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateSupplierUseCase } from "../use-case/create.supplier.use.case";
import { CreateCustomerUseCase } from "../use-case/create.customer.use.case";

@Injectable()
export class UserCreatedListener {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
  ) {}

  @OnEvent('user.created')
  async handle(event: { userId: string; email: string; name: string, phone: string | undefined }): Promise<void> {
    const { userId, email, name, phone } = event;
    await this.createSupplierUseCase.execute({ id: userId, email, name, phone });
    await this.createCustomerUseCase.execute({ id: userId, email, name, phone });
    console.log(`Supplier e Customer criados para o usuário: ${email}`);
  }
}