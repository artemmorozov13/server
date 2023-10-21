import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dto/CreateRoleDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Запросы для ролей пользователя')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}
    
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get("/:role")
    getRoleByValue(@Param("role") role: string) {
        return this.roleService.getRoleByValue(role)
    }
}
