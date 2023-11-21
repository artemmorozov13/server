import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dto/CreateRoleDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/role-auth-decorator';
import { ADMIN_ROLE } from 'src/constants/rolesConstant';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { RoleModel } from '../models/roles.model';

@ApiTags('Запросы для ролей пользователя')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Создать новую роль' })
  @ApiResponse({ status: 200, type: CreateRoleDto })
  @Roles(ADMIN_ROLE)
  @UseGuards(RoleGuard)
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Получить данные о роли' })
  @ApiResponse({ status: 200, type: RoleModel })
  @Roles(ADMIN_ROLE)
  @UseGuards(RoleGuard)
  @Get('/:role')
  getRoleByValue(@Param('role') role: string) {
    return this.roleService.getRoleByValue(role);
  }
}
