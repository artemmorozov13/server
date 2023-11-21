import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'SOME_NEW_ROLE',
    description: 'Роль, которую нужно создать',
  })
  readonly role: string;

  @ApiProperty({
    example: 'Просто какая то информация о роли',
    description: 'Роль пользователя, который может только редактировать данные',
  })
  readonly description: string;
}
