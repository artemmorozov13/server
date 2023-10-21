import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
    @ApiProperty({ example: 'example@mail.ru', description: "Уникальный email пользователя" })
    readonly email: string
    
    @ApiProperty({ example: 'tester1488', description: "Уникальный логин пользователя" })
    readonly username: string

    @ApiProperty({ example: '12345678', description: "Пароль пользователя" })
    readonly password: string

    @ApiProperty({ example: 'Artem', description: "Имя пользователя" })
    readonly firstName: string

    @ApiProperty({ example: 'Morozov', description: "Фамилия пользователя" })
    readonly lastName: string 
}