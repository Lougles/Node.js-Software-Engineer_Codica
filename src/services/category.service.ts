import { BadRequestException, Injectable } from '@nestjs/common';
import { Between, EntityManager } from 'typeorm';
import { Category } from '../entities/category.entity';
import { uuid } from 'uuidv4';
import { CategoryCreateModel, CategoryDeleteModel, CategoryUpdateModel, GetStatisticsFromPeriodModel } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAll(): Promise<Category[]> {
    return await this.entityManager.find(Category, { relations: { transactions: true } });
  }
  async getOne(id: string): Promise<Category> {
    return await this.entityManager.findOne(Category, { where: { id } });
  }

  async getStatisticsForPeriod(dto: GetStatisticsFromPeriodModel): Promise<any> {
    try {
      const statistics = [];
      for (let i = 0; i < dto.ids.length; i++) {
        let amount = 0;
        let type = '';
        const category = await this.entityManager.findOne(Category, {
          relations: {
            transactions: true,
          },
          where: { id: dto.ids[i], transactions: { createdAt: Between(new Date(dto.fromPeriod), new Date(dto.toPeriod)) } },
        });
        for (const i of category.transactions) {
          amount += i.amount;
          type = i.type;
        }
        const categoryStatistics = {
          name: category.name,
          type: type,
          balance: amount,
        };
        statistics.push(categoryStatistics);
      }
      return statistics;
    } catch (e) {
      return e.message;
    }
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
    const category = await this.entityManager.findOne(Category, { where: { id: dto.id }, relations: { transactions: true } });
    if (category?.transactions?.length) {
      throw new BadRequestException("You can't delete bank with transactions");
    }
    await this.entityManager.delete(Category, dto.id);
  }
}
