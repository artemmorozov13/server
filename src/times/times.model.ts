import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { UserModel } from "src/users/models/users.model";

interface TimeOptions {
    startTime: string
    endTime: string
    userId: number
}

@Table({ tableName: "times" })
export class TimeModel extends Model<TimeModel, TimeOptions> {
    @ApiProperty({ example: 1, description: 'Time ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true  })
    id: number

    @ApiProperty({ example: '10:00 AM', description: 'Start time' })
    @Column({ type: DataType.STRING, allowNull: false })
    startTime: string

    @ApiProperty({ example: '11:00 AM', description: 'End time' })
    @Column({ type: DataType.STRING, allowNull: false })
    endTime: string

    @ApiProperty({ example: 1, description: 'Date ID' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    dateId: number

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number
}
