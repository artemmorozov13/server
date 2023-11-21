import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  HasMany,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { TimeModel } from 'src/times/times.model';
import { UserModel } from 'src/users/models/users.model';

interface DateOptions {
  date: string;
  times: TimeModel[];
  userId: number;
}

@Table({ tableName: 'dates' })
export class DateModel extends Model<DateModel, DateOptions> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '2023-11-22T21:00:00.000Z',
    description: 'Дата записи',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @ApiProperty({ example: '21', description: 'id пользователя' })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({
    type: TimeModel,
    description: 'Доступное время для записи',
    isArray: true,
  })
  @HasMany(() => TimeModel, 'dateId')
  times: TimeModel[];
}
