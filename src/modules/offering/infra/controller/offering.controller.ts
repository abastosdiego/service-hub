import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateOfferingDto, CreateOfferingUseCase } from '../../application/use-case/create.offering.use.case';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('offerings')
export class OfferingController {
  constructor(private readonly createOfferingUseCase: CreateOfferingUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOffering(@Body() body: CreateOfferingDto) {
    return this.createOfferingUseCase.execute(body);
  }
}