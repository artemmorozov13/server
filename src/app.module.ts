import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/models/users.model';
import { RolesModule } from './roles/roles.module';
import { RoleModel } from './roles/models/roles.model';
import { UserRoleModel } from './roles/models/user-roles.model';
import { AuthModule } from './auth/module/auth.module';
import { DatesModule } from './dates/dates.module';
import { TimesModule } from './times/times.module';
import { DateModel } from './dates/dates.model';
import { TimeModel } from './times/times.model';

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
        UserRoleModel,
        DateModel,
        TimeModel
      ],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    DatesModule,
    TimesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
