import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../models/users.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel)
        private userRepository: typeof UserModel,
        private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set("roles", [role.id])
        return user
    }

    getAllUsers() {
        const users = this.userRepository.findAll({ include: { all: true } })
        return users
    }
}