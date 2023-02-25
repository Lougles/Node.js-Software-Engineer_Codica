import { ApiProperty } from '@nestjs/swagger';

export class TransactionDeleteModel {
  @ApiProperty()
  id: string;
}
