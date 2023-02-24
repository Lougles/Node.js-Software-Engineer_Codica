import { Body, Controller, Get } from "@nestjs/common";
import { BankService } from '../services/bank.service';
import { ResponseModel, successResponse } from '../models/response.model';
import { Bank } from '../entities/bank.entity';

@Controller('bank')
export class BankController {
  constructor(private readonly service: BankService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Bank[]>> {
    const bank = await this.service.getAll();
    return successResponse(bank);
  }

  @Get('getById')
  async getById(@Body() body: { id: string }): Promise<ResponseModel<Bank>> {
    const bank = await this.service.getById(body.id);
    return successResponse(bank);
  }
}
