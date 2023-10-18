import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { RoleModel } from "./roles.model";
import { UserModel } from "src/users/models/users.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRoleModel extends Model<UserRoleModel> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.INTEGER })
    roleId: number

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number
}
