import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CreateOfferingDto, CreateOfferingUseCase } from '../../application/use-case/create.offering.use.case';
import { ListOfferingsUseCase } from '../../application/use-case/list.offering.use.case';

@Controller('offerings')
export class OfferingController {
  constructor(
    private readonly createOfferingUseCase: CreateOfferingUseCase,
    private readonly listOfferingsUseCase: ListOfferingsUseCase
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list() {
    return await this.listOfferingsUseCase.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOffering(@Body() body: CreateOfferingDto) {
    return this.createOfferingUseCase.execute(body);
  }
}