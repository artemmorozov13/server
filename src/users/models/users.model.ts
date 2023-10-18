import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { RoleModel } from "src/roles/models/roles.model";
import { UserRoleModel } from "src/roles/models/user-roles.model";

interface UserOptions {
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
}

@Table({ tableName: "users" })
export class UserModel extends Model<UserModel, UserOptions> {
    @ApiProperty({ example: '1', description: "Уникальный идентификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'example@mail.ru', description: "Уникальный email пользователя" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: 'tester1488', description: "Уникальный логин пользователя" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string

    @ApiProperty({ example: '12345678', description: "Пароль пользователя" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'Artem', description: "Имя пользователя" })
    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string

    @ApiProperty({ example: 'Morozov', description: "Фамилия пользователя" })
    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[]
}
