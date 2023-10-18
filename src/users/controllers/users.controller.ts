import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models/users.model';

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

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }
}
