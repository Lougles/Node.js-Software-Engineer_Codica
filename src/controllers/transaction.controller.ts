import { Body, Controller, Get, Post } from "@nestjs/common";
import { TransactionService } from "../services/transaction.service";
import {
  emptySuccessResponse,
  ResponseModel,
  successResponse,
} from "../models/response.model";
import { Transaction } from "../entities/transaction.entity";
import { TransactionCreateModel, TransactionDeleteModel, TransactionModel } from "../models/transaction.model";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly service: TransactionService) {
  }

  @Post("webhook")
  async bankWebHook(@Body() body: TransactionModel) {
    //Валідація даних
    // create transaction in service
  }

  @Get("getAll")
  async getAll(@Body() body: {skip: number, take: number}): Promise<ResponseModel<Transaction[]>> {
    const transactions = await this.service.getAll(body.skip, body.take);
    return successResponse(transactions);
  }

  @Post("create")
  async create(@Body() dto: TransactionCreateModel): Promise<ResponseModel<Transaction>> {
    const newTransaction = await this.service.create(dto);
    return successResponse(newTransaction);
  }

  @Post("delete")
  async delete(@Body() body: TransactionDeleteModel): Promise<ResponseModel<void>> {
    await this.service.delete(body);
    return emptySuccessResponse();
  }
}
