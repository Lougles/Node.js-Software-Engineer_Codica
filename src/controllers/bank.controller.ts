import { Body, Controller, Get, Post } from '@nestjs/common';
import { BankService } from '../services/bank.service';
import {
  emptySuccessResponse,
  ResponseModel,
  successResponse,
} from '../models/response.model';
import { Bank } from '../entities/bank.entity';
import {
  BankCreateModel,
  BankDeleteModel,
  BankUpdateModel,
} from '../models/bank.model';

@Controller('bank')
export class BankController {
  constructor(private readonly service: BankService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Bank[]>> {
    const bank = await this.service.getAll();
    return successResponse(bank);
  }

  @Get('getOne')
  async getOne(@Body() body: { id: string }): Promise<ResponseModel<Bank>> {
    const bank = await this.service.getOne(body.id);
    return successResponse(bank);
  }

  @Post('create')
  async create(@Body() body: BankCreateModel): Promise<ResponseModel<Bank>> {
    const newBank = await this.service.create(body);
    return successResponse(newBank);
  }

  @Post('update')
  async update(@Body() body: BankUpdateModel): Promise<ResponseModel<Bank>> {
    const updateBank = await this.service.update(body);
    return successResponse(updateBank);
  }

  @Post('delete')
  async delete(@Body() body: BankDeleteModel): Promise<ResponseModel<void>> {
    await this.service.delete(body);
    return emptySuccessResponse();
  }
}
