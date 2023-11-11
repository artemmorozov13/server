import { Module } from '@nestjs/common';
import { TimeService } from './times.service';
import { TimeController } from './times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeModel } from './times.model';

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
    ])
  ],
  exports: [
    TimeService
  ]
})
export class TimesModule {}
