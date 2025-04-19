import { Body, Controller, Post } from '@nestjs/common';
import { CreateOfferingUseCase } from '../../application/use-case/create.offering.use.case';

@Controller('offerings')
export class OfferingController {
  constructor(private readonly createOfferingUseCase: CreateOfferingUseCase) {}

  @Post()
  async createOffering(@Body() body: {
    supplierId: string;
    name: string;
    description?: string;
    price?: number;
    estimatedDuration?: number;
  }) {
    return this.createOfferingUseCase.execute(body);
  }
}