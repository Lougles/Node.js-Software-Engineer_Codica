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

  async create(dto: TransactionCreateModel): Promise<Transaction> {
    const checkBank = await this.entityManager.findOne(Bank, {
      where: { id: dto.bank },
    });
    if (!checkBank) {
      throw new BadRequestException('Bank not found');
    }
    for (let i = 0; i < dto.categories.length; i++) {
      const temp = await this.entityManager.findOne(Category, {
        where: { id: dto.categories[i] },
      });
      if (!temp) {
        throw new BadRequestException('Category not found');
      }
    }
    if (!checkBank) {
      throw new BadRequestException('Bank not found');
    }
    const id = uuid();
    await this.entityManager.insert(Transaction, {
      id,
      amount: dto.amount,
      type: dto.type,
      bankId: dto.bank,
      categoryIds: dto.categories,
    });
    return await this.entityManager.findOne(Transaction, { where: { id }, relations: { bank: true, categories: true } });
  }

  async delete(dto: TransactionDeleteModel): Promise<void> {
    await this.entityManager.delete(Transaction, dto.id);
  }
}
