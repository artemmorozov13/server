import { Module } from '@nestjs/common';
import { TimeService } from './times.service';
import { TimeController } from './times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeModel } from './times.model';
import { AuthModule } from 'src/auth';

@Module({
  providers: [
    TimeService
  ],
  controllers: [
    TimeController
  ],
  imports: [
    SequelizeModule.forFeature([
      TimeModel
    ]),
    AuthModule
  ],
  exports: [
    TimeService
  ]
})
export class TimesModule {}
