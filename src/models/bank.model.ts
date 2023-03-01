import { ApiProperty } from '@nestjs/swagger';

export class BankCreateModel {
  @ApiProperty()
  name: string;
}

export class BankUpdateModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class BankDeleteModel {
  @ApiProperty()
  id: string;
}
