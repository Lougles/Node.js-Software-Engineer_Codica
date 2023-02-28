import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransactionDeleteModel } from '../models/transaction.model';

@Injectable()
export class TransactionService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(skip: number, take: number): Promise<Transaction[]> {
    return await this.entityManager.find(Transaction, { skip: skip, take: take });
  }



  async delete(dto: TransactionDeleteModel): Promise<void> {
    await this.entityManager.delete(Transaction, dto.id);
  }
}
