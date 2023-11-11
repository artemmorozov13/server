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

  async findAll(): Promise<DateModel[]> {
    return this.dateRepository.findAll();
  }

  async findOne(id: number) {
    const date = await this.dateRepository.findOne({
        where: { id },
        include: [TimeModel]
    });

    return date
  }

  async create(dto: CreateDateDto) {
    const { date, userId, times } = dto;

    const dateResponse = await this.dateRepository.create({ date, userId });

    const timesBody = times.map(time => ({
        ...time,
        dateId: dateResponse.id,
        userId: userId
    }))
    const createdTimes = await this.timeService.createManyTimes(timesBody);
    await dateResponse.$set('times', createdTimes);

    return this.findOne(dateResponse.id);
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
