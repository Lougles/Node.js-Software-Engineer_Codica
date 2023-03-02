import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateModel {
  @ApiProperty()
  name: string;
}

export class CategoryUpdateModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class CategoryDeleteModel {
  @ApiProperty()
  id: string;
}

export class GetStatisticsFromPeriodModel {
  @ApiProperty()
  ids: string[];

  @ApiProperty()
  fromPeriod: string;

  @ApiProperty()
  toPeriod: string;
}
