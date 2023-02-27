import { ApiProperty } from "@nestjs/swagger";

export class TransactionModel {
  id: string;
  amount: number;
  type: TransactionType;
}

export enum TransactionType {
  PROFITABLE = "profitable",
  CONSUMABLE = "consumable",
}


export class TransactionDeleteModel {
  @ApiProperty()
  id: string;
}
