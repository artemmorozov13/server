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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { DateService } from './dates.service';
import { DateModel } from './dates.model';
import { CreateDateDto } from './dto/CreateDateDto';
import { UpdateDateDto } from './dto/UpdateDateDto';
import { Roles } from 'src/auth/guard/role-auth-decorator';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { USER_ROLE } from 'src/constants/rolesConstant';

@ApiTags('Запросы для даты записи')
@Controller('dates')
export class DateController {
  constructor(private dateService: DateService) {}

  @ApiOperation({
    summary: 'Получить все даты пользователя без времени записи',
  })
  @ApiResponse({ status: 200, type: DateModel, isArray: true })
  @ApiParam({
    name: 'userId',
    example: 21,
    description: 'Введите id пользователя',
  })
  @Get('user/:userId')
  async getAllUserDatesWithoutTimes(
    @Param('userId') userId: number,
  ): Promise<DateModel[]> {
    return this.dateService.getAllUserDatesWithoutTimes(userId);
  }

  @ApiOperation({ summary: 'Получить дату по id' })
  @ApiParam({ name: 'dateId', example: 2, description: 'Введите id даты' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает модель даты',
    type: DateModel,
  })
  @Get(':dateId')
  async getDateById(@Param('dateId') dateId: number) {
    const date = await this.dateService.findOne(dateId);
    return date;
  }

  @ApiOperation({ summary: 'Создать несколько дат' })
  @ApiBody({ type: [CreateDateDto] })
  @ApiResponse({ status: 201, type: DateModel, isArray: true })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Post()
  async createManyDates(@Body() dto: CreateDateDto[]) {
    return this.dateService.createManyDates(dto);
  }

  @ApiOperation({ summary: 'Изменить дату по id' })
  @ApiParam({ name: 'dateId', example: 34, description: 'id даты записи' })
  @ApiResponse({ status: 200, type: DateModel })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Put(':dateId')
  async updateDate(
    @Param('dateId') dateId: number,
    @Body() updateDateDto: UpdateDateDto,
  ) {
    return this.dateService.update(dateId, updateDateDto);
  }

  @ApiOperation({ summary: 'Удалить дату по id' })
  @ApiParam({ name: 'dateId', example: 43, description: 'id даты записи' })
  @ApiResponse({ status: 200, type: Number })
  @Roles(USER_ROLE)
  @UseGuards(RoleGuard)
  @Delete(':dateId')
  async deleteDate(@Param('dateId') dateId: number) {
    return this.dateService.delete(dateId);
  }
}
