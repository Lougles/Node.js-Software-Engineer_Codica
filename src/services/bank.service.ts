import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Bank } from '../entities/bank.entity';

@Injectable()
export class BankService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Bank[]> {
    return await this.entityManager.find(Bank);
  }

  async getById(id: string): Promise<Bank> {
    return await this.entityManager.findOne(Bank, { where: { id } });
  }
}
