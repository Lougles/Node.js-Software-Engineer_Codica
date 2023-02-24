import { Controller, Get } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { ResponseModel, successResponse } from '../models/response.model';
import { Transaction } from '../entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Transaction[]>> {
    const transactions = await this.service.getAll();
    return successResponse(transactions);
  }
}