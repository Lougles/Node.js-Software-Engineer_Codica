import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../../services/category.service';
import { ResponseModel, successResponse } from '../../models/response.model';
import { Category } from '../../entities/category.entity';
describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            getStatisticsForPeriod: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('getAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [{ id: '1', name: 'Category 1', transactions: [] }];
      jest.spyOn(service, 'getAll').mockResolvedValue(categories);
      const result: ResponseModel<Category[]> = await controller.getAll();
      expect(result).toEqual(successResponse(categories));
    });
  });

  describe('getOne', () => {
    it('should return a category by id', async () => {
      const category: Category = { id: '1', name: 'Category 1', transactions: [] };
      jest.spyOn(service, 'getOne').mockResolvedValueOnce(category);
      const result: ResponseModel<Category> = await controller.getOne({ id: '1' });
      expect(result).toEqual(successResponse(category));
    });
  });

  describe('getStatisticsForPeriod', () => {
    const dto = {
      ids: ['1', '2'],
      fromPeriod: '2022-01-01',
      toPeriod: '2022-02-01',
    };

    const mockCategory = {
      id: '1',
      name: 'Category 1',
      transactions: [
        {
          id: '1',
          amount: 100,
          type: 'income',
          createdAt: new Date('2022-01-01'),
        },
        {
          id: '2',
          amount: 50,
          type: 'expense',
          createdAt: new Date('2022-02-01'),
        },
      ],
    };
    it('should return category statistics for a period', async () => {
      const statistics = [{ ids: ['1', '2'], fromPeriod: '2023-03-01', toPeriod: '2023-03-06' }];
      jest.spyOn(service, 'getStatisticsForPeriod').mockResolvedValueOnce(mockCategory);
      const result: ResponseModel<Category> = await controller.getStatisticsForPeriod(dto);
      expect(result).toEqual(successResponse(mockCategory));
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const category: Category = { id: '1', name: 'Category', transactions: [] };
      const categoryCreateModel = { name: 'Category' };
      jest.spyOn(service, 'create').mockResolvedValueOnce(category);
      const result: ResponseModel<Category> = await controller.create(categoryCreateModel);
      expect(result).toEqual(successResponse(category));
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const category: Category = { id: '1', name: 'Category', transactions: [] };
      const categoryUpdateModel = { id: '1', name: 'Category 2' };
      jest.spyOn(service, 'update').mockResolvedValueOnce(category);
      const result: ResponseModel<Category> = await controller.update(categoryUpdateModel);
      expect(result).toEqual(successResponse(category));
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      jest.spyOn(service, 'delete').mockResolvedValueOnce(undefined);
      const result: ResponseModel<void> = await controller.delete({ id: '1' });
      expect(result).toEqual(successResponse(undefined));
    });
  });
});
