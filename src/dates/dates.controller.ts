import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DateService } from './dates.service';
import { DateModel } from './dates.model';
import { CreateDateDto } from './dto/CreateDateDto';
import { UpdateDateDto } from './dto/UpdateDateDto';

@ApiTags('Запросы для даты записи')
@Controller('dates')
export class DateController {
  constructor(private dateService: DateService) {}

  @ApiOperation({ summary: 'Получить все даты пользователя' })
  @ApiResponse({ status: 200, description: 'Возвращает все даты', type: DateModel, isArray: true })
  @Get('user/:userId')
  async getAllUserDates(@Param('userId') userId: number): Promise<DateModel[]> {
    return this.dateService.getAllUserDates(userId);
  }

  @ApiOperation({ summary: 'Получить дату по id' })
  @ApiParam({ name: 'id', example: 1, description: 'id даты' })
  @ApiResponse({ status: 200, description: 'Возвращает модель даты', type: DateModel })
  @Get(':id')
  async getDateById(@Param('id') id: number) {
    const date = await this.dateService.findOne(id);
    return date
  }

  @ApiOperation({ summary: 'Create a new date' })
  @ApiResponse({ status: 201, description: 'The date has been successfully created', type: DateModel })
  @Post()
  async createManyDates(@Body() dto: CreateDateDto[]) {
    return this.dateService.createManyDates(dto);
  }

  // ___________________________________________

  @ApiOperation({ summary: 'Update a date by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Date ID' })
  @ApiResponse({ status: 200, description: 'The date has been successfully updated', type: DateModel })
  @Put(':id')
  async updateDate(
    @Param('id') id: number,
    @Body() updateDateDto: UpdateDateDto,
  ): Promise<any> {
    return this.dateService.update(id, updateDateDto);
  }

  @ApiOperation({ summary: 'Delete a date by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Date ID' })
  @ApiResponse({ status: 200, description: 'The date has been successfully deleted', type: Number })
  @Delete(':id')
  async deleteDate(@Param('id') id: number): Promise<number> {
    return this.dateService.delete(id);
  }
}