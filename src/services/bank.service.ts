import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Bank } from '../entities/bank.entity';
import { BankCreateModel, BankDeleteModel, BankUpdateModel } from '../models/bank.model';
import { uuid } from 'uuidv4';
import { countBanksBalance } from '../utils/count.balance';

@Injectable()
export class BankService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Bank[]> {
    const banks = await this.entityManager.find(Bank, { relations: { transactions: true } });
    countBanksBalance(banks);
    // for (let i = 0; i < banks.length; i++) {
    //   banks[i].balance = 0;
    //   for (let j = 0; j < banks[i].transactions.length; j++) {
    //     if (banks[i].transactions[j].type === TransactionType.CONSUMABLE) {
    //       banks[i].balance -= banks[i].transactions[j].amount;
    //     }
    //     if (banks[i].transactions[j].type === TransactionType.PROFITABLE) {
    //       banks[i].balance += banks[i].transactions[j].amount;
    //     }
    //   }
    // }
    await this.entityManager.save(banks);
    return banks;
  }

  async getOne(id: string): Promise<Bank> {
    const bank = await this.entityManager.findOne(Bank, { where: { id }, relations: { transactions: true } });
    countBanksBalance([bank]);
    await this.entityManager.save(bank);
    return bank;
  }

  async create(dto: BankCreateModel): Promise<Bank> {
    const id = uuid();
    await this.entityManager.insert(Bank, {
      id,
      name: dto.name,
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
    await this.entityManager.save(bank);
    return this.entityManager.findOne(Bank, { where: { id: dto.id } });
  }

  async delete(dto: BankDeleteModel): Promise<void> {
    const bank = await this.entityManager.findOne(Bank, { where: { id: dto.id }, relations: { transactions: true } });
    if (bank?.transactions?.length) {
      throw new BadRequestException("You can't delete bank with transactions");
    }
    await this.entityManager.delete(Bank, dto.id);
  }
}
