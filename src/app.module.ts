import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/models/users.model';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/controllers/roles.controller';
import { RolesModule } from './roles/roles.module';
import { RoleModel } from './roles/models/roles.model';
import { UserRoleModel } from './roles/models/user-roles.model';
import { AuthModule } from './auth/module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        UserModel,
        RoleModel,
        UserRoleModel
      ],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
