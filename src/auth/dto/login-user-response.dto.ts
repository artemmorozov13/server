import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserModel } from 'src/users/models/users.model';

export class LoginUserResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT токен',
  })
  readonly token: string;

  @ApiProperty({ example: CreateUserDto, description: 'Данные о пользователе' })
  readonly user: UserModel;
}
