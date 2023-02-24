import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum transactionType {
  PROFITABLE = 'profitable',
  CONSUMABLE = 'consumable',
}

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
    enum: transactionType,
    default: transactionType.CONSUMABLE,
  })
  type: transactionType;
}
