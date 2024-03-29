import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './controllers/roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/models/users.model';
import { UserRoleModel } from './models/user-roles.model';
import { RoleModel } from './models/roles.model';
import { AuthModule } from 'src/auth';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([UserModel, RoleModel, UserRoleModel]),
    AuthModule,
  ],
  exports: [RolesService],
})
export class RolesModule {}
