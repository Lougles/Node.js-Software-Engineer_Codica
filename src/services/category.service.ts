import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Category[]> {
    return await this.entityManager.find(Category);
  }
}
