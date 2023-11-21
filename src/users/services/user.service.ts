import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { USER_ROLE } from 'src/constants/rolesConstant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(USER_ROLE);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);

    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!role) {
      throw new HttpException(
        `Роли ${dto.role} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await user.$add('roles', role.id);
      return dto;
    } catch (error) {
      throw new HttpException(
        `Ошибка при создании роли`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers() {
    const users = this.userRepository.findAll({ include: { all: true } });
    return users;
  }
}
