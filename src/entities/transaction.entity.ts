import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../models/transaction.model';
import { Bank } from './bank.entity';
import { Category } from './category.entity';

@Entity()
export class Transaction {
  @ApiProperty()
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ name: 'amount', type: 'int' })
  amount: number;

  @ApiProperty()
  @Column({
    name: 'types',
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.CONSUMABLE,
  })
  type: TransactionType;

  @ApiProperty()
  @Column({ name: 'bankId', type: 'text', default: null })
  bankId: string;

  @Column({ name: 'created_at', type: 'timestamp', default: new Date() })
  createdAt: Date;

  @ManyToOne(() => Bank, bank => bank.transactions)
  bank: Bank;

  @ManyToMany(() => Category, category => category.transactions, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
