import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/roles.model';
import { CreateRoleDto } from './dto/CreateRoleDto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel) private rolesRepository: typeof RoleModel,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { role: value } });
    return role;
  }
}
