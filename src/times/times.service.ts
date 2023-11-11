import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimeModel } from './times.model';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { UpdateTimeDto } from './dto/UpdateTimeDto';

@Injectable()
export class TimeService {
  constructor(
    @InjectModel(TimeModel)
    private readonly timeModel: typeof TimeModel,
  ) {}

  async createTime(createTimeDto: CreateTimeDto): Promise<TimeModel> {
    return this.timeModel.create(createTimeDto);
  }

  async createManyTimes(dto: CreateTimeDto[]): Promise<TimeModel[]> {
    return this.timeModel.bulkCreate(dto);
  }

  async getAllTimes(): Promise<TimeModel[]> {
    return this.timeModel.findAll();
  }

  async getTimeById(id: number): Promise<TimeModel> {
    return this.timeModel.findByPk(id);
  }

  async getTimeByDateId(dateId: number) {
    return this.timeModel.findAll({ where: { dateId } })
  }

  async updateTime(id: number, updateTimeDto: UpdateTimeDto): Promise<TimeModel> {
    await this.timeModel.update(updateTimeDto, { where: { id } });
    return this.timeModel.findByPk(id);
  }

  /**
   * Delete a time by ID.
   * @param id The ID of the time to delete.
   * @returns The deleted time.
   */
  async deleteTime(id: number): Promise<TimeModel> {
    const time = await this.timeModel.findByPk(id);
    await time.destroy();
    return time;
  }
}