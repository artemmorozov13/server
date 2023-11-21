import { ApiProperty } from '@nestjs/swagger';
import { CreateTimeDto } from 'src/times/dto/CreateTimeDto';
import { TimeModel } from 'src/times/times.model';

export class CreateDateDto {
  @ApiProperty({
    example: '2023-11-22T21:00:00.000Z',
    description: 'Выбраная дата',
  })
  readonly date: string;

  @ApiProperty({ example: 21, description: 'id пользователя' })
  readonly userId: number;

  @ApiProperty({
    type: CreateTimeDto,
    isArray: true,
    description: 'Выбраные временные интервалы',
  })
  readonly times: TimeModel[];
}
