import { ApiProperty } from '@nestjs/swagger';

export class UpdateDateDto {
  @ApiProperty({
    example: '2023-11-22T21:00:00.000Z',
    description: 'Выбраная дата',
  })
  readonly date: string;
}
