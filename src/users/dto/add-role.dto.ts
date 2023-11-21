import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль, которую нужно добавить',
  })
  readonly role: string;

  @ApiProperty({
    example: 21,
    description: 'id пользователя, которому добавить роль',
  })
  readonly userId: number;
}
