import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from '../entities/category.entity';
import { uuid } from 'uuidv4';
import { CategoryCreateModel, CategoryDeleteModel, CategoryUpdateModel } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Category[]> {
    return await this.entityManager.find(Category, { relations: { transactions: true } });
  }
  async getOne(id: string): Promise<Category> {
    return await this.entityManager.findOne(Category, { where: { id } });
  }

  async create(dto: CategoryCreateModel): Promise<Category> {
    const id = uuid();
    await this.entityManager.insert(Category, {
      id,
      name: dto.name,
    });
    return await this.entityManager.findOne(Category, { where: { id } });
  }

  async update(dto: CategoryUpdateModel): Promise<Category> {
    const category = await this.entityManager.findOne(Category, {
      where: { id: dto.id },
    });
    if (!category) {
      throw new BadRequestException('There is no such bank!');
    }
    category.name = dto.name;
    await this.entityManager.save(category);
    return this.entityManager.findOne(Category, { where: { id: dto.id } });
  }

  async delete(dto: CategoryDeleteModel): Promise<void> {
    await this.entityManager.delete(Category, dto.id);
  }
}
