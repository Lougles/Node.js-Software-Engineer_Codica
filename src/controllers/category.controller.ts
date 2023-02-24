import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ResponseModel, successResponse } from '../models/response.model';
import { Category } from '../entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('getAll')
  async getAll(): Promise<ResponseModel<Category[]>> {
    const categories = await this.service.getAll();
    return successResponse(categories);
  }
}