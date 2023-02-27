import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'text' })
  name: string;

}
