import { ApiProperty } from '@nestjs/swagger';

export class BankCreateModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  balance: number;
}

export class BankUpdateModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  balance: number;
}

export class BankDeleteModel {
  @ApiProperty()
  id: string;
}
