import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimeModel } from './times.model';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { UpdateTimeDto } from './dto/UpdateTimeDto';
import { UpdateReservationDto } from './dto/UpdateReservationDto';

@Injectable()
export class TimeService {
  constructor(
    @InjectModel(TimeModel)
    private readonly timeModel: typeof TimeModel,
  ) {}

  async getTimesByDateId(dateId: number) {
    return this.timeModel.findAll({ where: { dateId } })
  }

  async getNotReservedTimesByDateId(dateId: number) {
    return this.timeModel.findAll({ where: { dateId, isReserved: false } })
  }

  async updateTimeReservationStatusByTimeId(timeId: number, updateStatus: UpdateReservationDto) {
    return this.timeModel.update(updateStatus, { where: { id: timeId } })
  }

  async updateTimeById(id: number, updateTimeDto: UpdateTimeDto): Promise<TimeModel> {
    await this.timeModel.update(updateTimeDto, { where: { id } });
    return this.timeModel.findByPk(id);
  }

  // ______________________________________________

  async createTime(createTimeDto: CreateTimeDto): Promise<TimeModel> {
    return this.timeModel.create(createTimeDto);
  }

  async createManyTimes(dto: CreateTimeDto[]): Promise<TimeModel[]> {
    return this.timeModel.bulkCreate(dto);
  }

  async getTimeById(id: number): Promise<TimeModel> {
    return this.timeModel.findByPk(id);
  }

  async deleteTime(id: number): Promise<TimeModel> {
    const time = await this.timeModel.findByPk(id);
    await time.destroy();
    return time;
  }
}