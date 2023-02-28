import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction_categoryEntity {
  @ApiProperty()
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @ApiProperty()
  @Column({ name: 'category_id', type: 'uuid' })
  category_id: string;

  @ApiProperty()
  @Column({ name: 'transaction_id', type: 'uuid' })
  transaction_id: string;
}
