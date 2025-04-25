import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { GetCustomerUseCase } from '../../application/use-case/get.customer.use.case';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly getCustomerUseCase: GetCustomerUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCustomer() {
    return this.getCustomerUseCase.execute();
  }
}