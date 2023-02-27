import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';

@Entity()
export class Bank {
  @ApiProperty()
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'text' })
  name: string;

  @ApiProperty()
  @Column({ name: 'balance', type: 'int' })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions: Transaction[];
}
