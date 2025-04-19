import { Body, Controller, Post } from '@nestjs/common';
import { CreateOfferingDto, CreateOfferingUseCase } from '../../application/use-case/create.offering.use.case';

@Controller('offerings')
export class OfferingController {
  constructor(private readonly createOfferingUseCase: CreateOfferingUseCase) {}

  @Post()
  async createOffering(@Body() body: CreateOfferingDto) {
    return this.createOfferingUseCase.execute(body);
  }
}