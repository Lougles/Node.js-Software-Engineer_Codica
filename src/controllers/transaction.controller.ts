import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  emptySuccessResponse,
  ResponseModel,
  successResponse,
} from '../models/response.model';
import { Transaction } from '../entities/transaction.entity';
import {
  TransactionCreateModel,
  TransactionDeleteModel,
} from '../models/transaction.model';
import { HttpService } from '@nestjs/axios';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly service: TransactionService,
    private readonly httpService: HttpService,
  ) {}

  @Post('webhook')
  bankWebHook(@Body() data: TransactionCreateModel) {
    try {
      const createTransaction = this.service.webhookTransaction(data);
      this.httpService
        .post(
          'http://localhost:3000/transaction/vovachelidze-webhook-create-transaction',
          data,
        )
        .subscribe({
          complete: () => {
            console.log('completed');
          },
          error: err => {
            return err.message;
          },
        });
      return createTransaction;
    } catch (e) {
      return e.message;
    }
  }

  @Get('getAll')
  async getAll(
    @Body() body: { skip: number; take: number },
  ): Promise<ResponseModel<Transaction[]>> {
    const transactions = await this.service.getAll(body.skip, body.take);
    return successResponse(transactions);
  }

  @Post('vovachelidze-webhook-create-transaction')
  async create(
    @Body() dto: TransactionCreateModel,
  ): Promise<ResponseModel<Transaction>> {
    const newTransaction = await this.service.create(dto);
    return successResponse(newTransaction);
  }

  @Post('delete')
  async delete(
    @Body() body: TransactionDeleteModel,
  ): Promise<ResponseModel<void>> {
    await this.service.delete(body);
    return emptySuccessResponse();
  }
}
