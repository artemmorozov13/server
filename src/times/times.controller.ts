import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TimeService } from './times.service';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { TimeModel } from './times.model';
import { UpdateTimeDto } from './dto/UpdateTimeDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Запросы для времени записи')
@Controller('times')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  async createTime(@Body() createTimeDto: CreateTimeDto): Promise<TimeModel> {
    return this.timeService.createTime(createTimeDto);
  }

  @Get()
  async getAllTimes(): Promise<TimeModel[]> {
    return this.timeService.getAllTimes();
  }

  @Get(':id')
  async getTimeById(@Param('id') id: number): Promise<TimeModel> {
    return this.timeService.getTimeById(id);
  }

  @Put(':id')
  async updateTime(
    @Param('id') id: number,
    @Body() updateTimeDto: UpdateTimeDto,
  ): Promise<TimeModel> {
    return this.timeService.updateTime(id, updateTimeDto);
  }

  @Delete(':id')
  async deleteTime(@Param('id') id: number): Promise<TimeModel> {
    return this.timeService.deleteTime(id);
  }
}