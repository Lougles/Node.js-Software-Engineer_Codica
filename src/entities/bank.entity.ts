import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
