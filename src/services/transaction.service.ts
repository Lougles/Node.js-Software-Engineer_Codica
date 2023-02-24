import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Transaction[]> {
    return await this.entityManager.find(Transaction);
  }
}
