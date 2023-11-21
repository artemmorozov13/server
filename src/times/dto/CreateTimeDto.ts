import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeDto {
  @ApiProperty({
    example: '2023-11-22T21:11:30.000Z',
    description: 'Дата начала записи',
  })
  readonly startTime: string;

  @ApiProperty({
    example: '2023-11-22T21:12:30.000Z',
    description: 'Дата конца записи',
  })
  readonly endTime: string;

  @ApiProperty({ example: 'Артем', description: 'Имя записавшегося человека' })
  readonly firstName: string | null;

  @ApiProperty({
    example: '+7(952)244-42-41',
    description: 'Номер телефона записавшегося человека',
  })
  readonly phone: string | null;

  @ApiProperty({ example: 21, description: 'id пользоваеля' })
  readonly userId: number;

  @ApiProperty({ example: false, description: 'Кто то записался?' })
  readonly isReserved: boolean;
}
