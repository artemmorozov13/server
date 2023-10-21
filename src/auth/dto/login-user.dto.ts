import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
    @ApiProperty({ example: 'example@mail.ru', description: "Уникальный email пользователя" })
    readonly email: string

    @ApiProperty({ example: '12345678', description: "Пароль пользователя" })
    readonly password: string
}