import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionCreateModel, TransactionDeleteModel } from '../models/transaction.model';
import { uuid } from 'uuidv4';
import { Bank } from '../entities/bank.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(skip: number, take: number): Promise<Transaction[]> {
    return await this.entityManager.find(Transaction, { skip: skip, take: take, relations: { categories: true, bank: true } });
  }
  webhookTransaction(data: TransactionCreateModel): TransactionCreateModel {
    return data;
  }
  async create(dto: TransactionCreateModel): Promise<Transaction> {
    const temp = [];
    const bank = await this.entityManager.findOne(Bank, {
      where: { id: dto.bank },
    });
    if (!bank) {
      throw new BadRequestException('Bank not found');
    }
    for (const i of dto.categories) {
      const checkCategories = await this.entityManager.findOne(Category, { where: { id: i } });
      if (!checkCategories) {
        throw new BadRequestException('Category not found');
      }
      temp.push(checkCategories);
    }
    const id = uuid();
    const transaction = new Transaction();
    transaction.id = id;
    transaction.amount = dto.amount;
    transaction.type = dto.type;
    transaction.bankId = dto.bank;
    transaction.categories = temp;
    transaction.createdAt = dto.createAt;
    await this.entityManager.save(transaction);
    return transaction;
  }
  async delete(dto: TransactionDeleteModel): Promise<void> {
    await this.entityManager.delete(Transaction, dto.id);
  }
}
