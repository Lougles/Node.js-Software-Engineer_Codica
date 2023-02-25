import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  emptySuccessResponse,
  ResponseModel,
  successResponse,
} from '../models/response.model';
import { Transaction } from '../entities/transaction.entity';
import { TransactionDeleteModel } from '../models/transaction.model';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Transaction[]>> {
    const transactions = await this.service.getAll();
    return successResponse(transactions);
  }

  @Post('delete')
  async delete(@Body() body: TransactionDeleteModel): Promise<ResponseModel<void>> {
    await this.service.delete(body);
    return emptySuccessResponse();
  }
}
