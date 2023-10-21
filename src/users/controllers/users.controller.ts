import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models/users.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { Roles } from 'src/auth/guard/role-auth-decorator';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { AddRoleDto } from '../dto/add-role.dto';

@ApiTags("Запросы для User")
@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}
    
    @ApiOperation({ summary: "Создание пользователя" })
    @ApiResponse({ status: 200, type: UserModel })
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({ summary: "Получить список всех пользователей" })
    @ApiResponse({ status: 200, type: [UserModel] })
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({ summary: "Добавить роль пользователю" })
    @ApiResponse({ status: 200, type: [UserModel] })
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @Post("/role")
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto) 
    }
}
