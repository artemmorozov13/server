import { Module } from '@nestjs/common';
import { DateController } from './dates.controller';
import { DateService } from './dates.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DateModel } from './dates.model';
import { TimesModule } from 'src/times/times.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [
    DateController
  ],
  providers: [
    DateService
  ],
  imports: [
    SequelizeModule.forFeature([
      DateModel
    ]),
    TimesModule,
    RolesModule
  ]
})
export class DatesModule {}
