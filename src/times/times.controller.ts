import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TimeService } from './times.service';
import { CreateTimeDto } from './dto/CreateTimeDto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateReservationDto } from './dto/UpdateReservationDto';
import { Roles } from 'src/auth/guard/role-auth-decorator';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { USER_ROLE } from 'src/constants/rolesConstant';

@ApiTags('Запросы для времени записи')
@Controller('times')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @ApiOperation({ summary: 'Получить все записи по id даты' })
  @ApiParam({ name: 'dateId', example: 34, description: 'id даты записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Get('date/:dateId')
  async getTimesByDateId(@Param('dateId') dateId: number) {
    return this.timeService.getTimesByDateId(dateId);
  }

  @ApiOperation({
    summary: 'Получить все записи по id даты, которые не заняты',
  })
  @ApiParam({ name: 'dateId', example: 34, description: 'id даты записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Get('date/:dateId/available')
  async getNotReservedTimesByDateId(@Param('dateId') dateId: number) {
    return this.timeService.getNotReservedTimesByDateId(dateId);
  }

  @ApiOperation({ summary: 'Получить время записи по id' })
  @ApiParam({
    name: 'timeId',
    example: 34,
    description: 'timeId времени записи',
  })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Get(':timeId')
  async getTimeById(@Param('timeId') timeId: number) {
    return this.timeService.getTimeById(timeId);
  }

  @ApiOperation({ summary: 'Записаться на выбраное время по id' })
  @ApiParam({ name: 'timeId', example: 23, description: 'id времени записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Put(':timeId')
  async updateTimeReservationStatus(
    @Param('timeId') timeId: number,
    @Body() updatedReservationStatus: UpdateReservationDto,
  ) {
    return this.timeService.updateTimeReservationStatusByTimeId(
      timeId,
      updatedReservationStatus,
    );
  }

  @ApiOperation({ summary: 'Редактировать время записи по id' })
  @ApiParam({ name: 'timeId', example: 34, description: 'id времени записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Put(':timeId')
  async updateTime(
    @Param('timeId') timeId: number,
    @Body() updateTimeDto: CreateTimeDto,
  ) {
    return this.timeService.updateTimeById(timeId, updateTimeDto);
  }

  @ApiOperation({ summary: 'Создать время записи по id' })
  @ApiParam({ name: 'timeId', example: 34, description: 'id времени записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Post()
  async createTime(@Body() createTimeDto: CreateTimeDto) {
    return this.timeService.createTime(createTimeDto);
  }

  @ApiOperation({ summary: 'Удалить время записи по id' })
  @ApiParam({ name: 'timeId', example: 34, description: 'id времени записи' })
  @ApiResponse({ status: 200, type: CreateTimeDto })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Delete(':timeId')
  async deleteTime(@Param('timeId') timeId: number) {
    return this.timeService.deleteTime(timeId);
  }
}
