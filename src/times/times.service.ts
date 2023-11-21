import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimeModel } from './times.model';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { UpdateReservationDto } from './dto/UpdateReservationDto';

@Injectable()
export class TimeService {
  constructor(
    @InjectModel(TimeModel)
    private readonly timeModel: typeof TimeModel,
  ) {}

  async getTimesByDateId(dateId: number) {
    return this.timeModel.findAll({ where: { dateId } });
  }

  async getNotReservedTimesByDateId(dateId: number) {
    return this.timeModel.findAll({ where: { dateId, isReserved: false } });
  }

  async updateTimeReservationStatusByTimeId(
    timeId: number,
    updateStatus: UpdateReservationDto,
  ) {
    return this.timeModel.update(updateStatus, { where: { id: timeId } });
  }

  async updateTimeById(timeId: number, updateTimeDto: CreateTimeDto) {
    await this.timeModel.update(updateTimeDto, { where: { id: timeId } });
    return this.timeModel.findByPk(timeId);
  }

  async createTime(createTimeDto: CreateTimeDto) {
    return this.timeModel.create(createTimeDto);
  }

  async createManyTimes(dto: CreateTimeDto[]) {
    return this.timeModel.bulkCreate(dto);
  }

  async getTimeById(timeId: number) {
    return this.timeModel.findByPk(timeId);
  }

  async deleteTime(timeId: number) {
    const time = await this.timeModel.findByPk(timeId);
    await time.destroy();
    return time;
  }
}
