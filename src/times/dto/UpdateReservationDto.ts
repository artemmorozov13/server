import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({ example: true, description: 'Запись забронирована или нет' })
  isReserved: boolean;

  @ApiProperty({ example: 'Артем', description: 'Имя записавшегося человека' })
  firstName: string;

  @ApiProperty({
    example: '+7(952)244-42-41',
    description: 'Номер телефона записавшегося человека',
  })
  phone: string;
}
