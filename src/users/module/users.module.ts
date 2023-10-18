import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UserService } from '../services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/users.model';
import { RoleModel } from 'src/roles/models/roles.model';
import { UserRoleModel } from 'src/roles/models/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    UserService
  ],
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      RoleModel,
      UserRoleModel
    ]),
    RolesModule
  ]
})
export class UsersModule {}
