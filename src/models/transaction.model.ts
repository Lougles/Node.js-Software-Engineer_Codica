import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class TransactionModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  type: TransactionType;
}

export enum TransactionType {
  PROFITABLE = "profitable",
  CONSUMABLE = "consumable",
}

export class TransactionCreateModel {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  type: TransactionType;

  @ApiProperty()
  categories: [];

  @IsUUID()
  @ApiProperty()
  bank: string;
}
export class TransactionDeleteModel {
  @ApiProperty()
  id: string;
}
