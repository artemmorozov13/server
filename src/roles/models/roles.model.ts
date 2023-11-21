import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/models/users.model';
import { UserRoleModel } from './user-roles.model';

interface RoleOptions {
  role: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleOptions> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ENTREPRENEUR', description: 'Роль клиента' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  role: string;

  @ApiProperty({
    example: 'Описание роли',
    description: 'Пользователь с возможностью создание доски',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel)
  users: UserModel[];
}
