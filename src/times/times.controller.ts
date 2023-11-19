import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TimeService } from './times.service';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { TimeModel } from './times.model';
import { UpdateTimeDto } from './dto/UpdateTimeDto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReservationDto } from './dto/UpdateReservationDto';
import { Roles } from 'src/auth/guard/role-auth-decorator';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { ADMIN_ROLE } from 'src/constants/rolesConstant';

@ApiTags('Запросы для времени записи')
@Controller('times')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Roles(ADMIN_ROLE)
  @UseGuards(RoleGuard)
  @Get('date/:dateId')
  async getTimesByDateId(@Param("dateId") dateId: number) {
    return this.timeService.getTimesByDateId(dateId);
  } 

  @Get('date/:dateId/available')
  async getNotReservedTimesByDateId (@Param("dateId") dateId: number) {
    return this.timeService.getNotReservedTimesByDateId(dateId)
  }

  @Put(':timeId')
  async updateTimeReservationStatus(
    @Param('timeId') timeId: number,
    @Body() updatedReservationStatus: UpdateReservationDto
  ) {
    return this.timeService.updateTimeReservationStatusByTimeId(timeId, updatedReservationStatus)
  }

  @Put(':id')
  async updateTime(
    @Param('id') id: number,
    @Body() updateTimeDto: UpdateTimeDto,
  ): Promise<TimeModel> {
    return this.timeService.updateTimeById(id, updateTimeDto);
  }



  @Post()
  async createTime(@Body() createTimeDto: CreateTimeDto): Promise<TimeModel> {
    return this.timeService.createTime(createTimeDto);
  }

  @Get(':id')
  async getTimeById(@Param('id') id: number): Promise<TimeModel> {
    return this.timeService.getTimeById(id);
  }

  @Delete(':id')
  async deleteTime(@Param('id') id: number): Promise<TimeModel> {
    return this.timeService.deleteTime(id);
  }
}