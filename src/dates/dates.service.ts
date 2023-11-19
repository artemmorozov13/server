import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DateModel } from './dates.model';
import { CreateDateDto } from './dto/CreateDateDto';
import { TimeService } from 'src/times/times.service';
import { TimeModel } from 'src/times/times.model';

@Injectable()
export class DateService {
  constructor(
    @InjectModel(DateModel)
    private dateRepository: typeof DateModel,
    private timeService: TimeService
  ) {}

  async getAllUserDates(userId: number): Promise<DateModel[]> {
    return this.dateRepository.findAll({ where: { userId } });
  }

  async findOne(id: number) {
    const date = await this.dateRepository.findOne({
        where: { id },
        include: [TimeModel]
    });

    return date
  }

  async createManyDates(dates: CreateDateDto[]) {
    const createdDates = [];

    const dateEntities = dates.map(dto => {
      const { date, userId } = dto;
      return { date, userId };
    });

    const insertedDates = await this.dateRepository.bulkCreate(dateEntities);

    for (let i = 0; i < insertedDates.length; i++) {
      const dateResponse = insertedDates[i];
      const dto = dates[i];
      const { times } = dto;

      const timesBody = times.map(time => ({
        startTime: time.startTime,
        endTime: time.endTime,
        dateId: dateResponse.id,
        userId: dto.userId,
        isReserved: false
      }));

      const createdTimes = await this.timeService.createManyTimes(timesBody);
      await dateResponse.$set('times', createdTimes);

      createdDates.push(dateResponse);
    }

    return createdDates;
  }

  async update(id: number, dateData: Partial<DateModel>): Promise<[number, DateModel[]]> {
    return this.dateRepository.update(dateData, { where: { id } }).then(([affectedCount]) => {
      return [affectedCount, []];
    });
  }

  async delete(id: number): Promise<number> {
    return this.dateRepository.destroy({ where: { id } });
  }
}
