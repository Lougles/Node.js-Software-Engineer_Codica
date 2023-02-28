import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Bank } from '../entities/bank.entity';
import { BankCreateModel, BankDeleteModel, BankUpdateModel } from '../models/bank.model';
import { uuid } from 'uuidv4';

@Injectable()
export class BankService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Bank[]> {
    return await this.entityManager.find(Bank);
  }

  async getOne(id: string): Promise<Bank> {
    return await this.entityManager.findOne(Bank, { where: { id } });
  }

  async create(dto: BankCreateModel): Promise<Bank> {
    const id = uuid();
    await this.entityManager.insert(Bank, {
      id,
      name: dto.name,
      balance: dto.balance,
    });
    return await this.entityManager.findOne(Bank, { where: { id } });
  }

  async update(dto: BankUpdateModel): Promise<Bank> {
    const bank = await this.entityManager.findOne(Bank, {
      where: { id: dto.id },
    });
    if (!bank) {
      throw new BadRequestException('There is no such bank!');
    }
    bank.name = dto.name;
    bank.balance = dto.balance;
    await this.entityManager.save(bank);
    return this.entityManager.findOne(Bank, { where: { id: dto.id } });
  }

  async delete(dto: BankDeleteModel): Promise<void> {
    await this.entityManager.delete(Bank, dto.id);
  }
}
