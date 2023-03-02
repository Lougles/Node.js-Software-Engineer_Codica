import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { emptySuccessResponse, ResponseModel, successResponse } from '../models/response.model';
import { Category } from '../entities/category.entity';
import { CategoryCreateModel, CategoryDeleteModel, CategoryUpdateModel, GetStatisticsFromPeriodModel } from '../models/category.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Category[]>> {
    const categories = await this.service.getAll();
    return successResponse(categories);
  }
  @Get('getOne')
  async getOne(@Body() body: { id: string }): Promise<ResponseModel<Category>> {
    const category = await this.service.getOne(body.id);
    return successResponse(category);
  }
  @Get('getStatistics')
  async getStatisticsForPeriod(@Body() body: GetStatisticsFromPeriodModel): Promise<ResponseModel<Category>> {
    const category = await this.service.getStatisticsForPeriod(body);
    return successResponse(category);
  }

  @Post('create')
  async create(@Body() body: CategoryCreateModel): Promise<ResponseModel<Category>> {
    const newCategory = await this.service.create(body);
    return successResponse(newCategory);
  }

  @Post('update')
  async update(@Body() body: CategoryUpdateModel): Promise<ResponseModel<Category>> {
    const updateBank = await this.service.update(body);
    return successResponse(updateBank);
  }

  @Post('delete')
  async delete(@Body() body: CategoryDeleteModel): Promise<ResponseModel<void>> {
    await this.service.delete(body);
    return emptySuccessResponse();
  }
}
