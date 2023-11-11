import { Model, Column, DataType, HasMany, Table, ForeignKey } from "sequelize-typescript";
import { TimeModel } from "src/times/times.model";
import { UserModel } from "src/users/models/users.model";

interface DateOptions {
    date: string
    times: TimeModel[]
    userId: number
}

@Table({ tableName: "dates" })
export class DateModel extends Model<DateModel, DateOptions> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    date: string

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number

    @HasMany(() => TimeModel, "dateId")
    times: TimeModel[]
}
