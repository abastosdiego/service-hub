import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { GetSupplierUseCase } from '../../application/use-case/get.supplier.use.case';

@Controller('suppliers')
export class SupplierController {
  constructor(
    private readonly getSupplierUseCase: GetSupplierUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSupplier() {
    return this.getSupplierUseCase.execute();
  }
}