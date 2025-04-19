import { Controller, Get, Param } from '@nestjs/common';
import { GetSupplierByIdUseCase } from '../../application/use-case/get.supplier.by.id.use.case';

@Controller('suppliers')
export class SupplierController {
  constructor(
    private readonly getSupplierByIdUseCase: GetSupplierByIdUseCase,
  ) {}

  @Get(':id')
  async getSupplierById(@Param('id') id: string) {
    return this.getSupplierByIdUseCase.execute(id);
  }
}