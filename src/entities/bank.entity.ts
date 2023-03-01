import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Bank {
  @ApiProperty()
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'text' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @Column({ name: 'balance', type: 'float', default: 0.0 })
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.bank)
  transactions: Transaction[];
}
