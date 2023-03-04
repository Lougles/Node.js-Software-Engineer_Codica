import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../entities/category.entity';
import { ResponseModel, successResponse } from '../../models/response.model';
import { CategoryCreateModel, CategoryDeleteModel, CategoryUpdateModel, GetStatisticsFromPeriodModel } from '../../models/category.model';
import { mockCategory, mockCreateCategoryModel, mockDeleteCategoryModel, mockGetStatisticsFromPeriodModel, mockUpdateCategoryModel } from './category.mock';

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
    it('should return a list of categories', async () => {
      const mockCategories: Category[] = [mockCategory];
      jest.spyOn(service, 'getAll').mockResolvedValueOnce(mockCategories);

      const result: ResponseModel<Category[]> = await controller.getAll();

      expect(result).toEqual(successResponse(mockCategories));
    });
  });

  describe('getOne', () => {
    it('should return a category by id', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValueOnce(mockCategory);

      const result: ResponseModel<Category> = await controller.getOne({ id: '1' });

      expect(result).toEqual(successResponse(mockCategory));
    });
  });

  describe('getStatisticsForPeriod', () => {
    it('should return category statistics for a period', async () => {
      jest.spyOn(service, 'getStatisticsForPeriod').mockResolvedValueOnce(mockCategory);

      const result: ResponseModel<Category> = await controller.getStatisticsForPeriod(mockGetStatisticsFromPeriodModel);

      expect(result).toEqual(successResponse(mockCategory));
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockCategory);

      const result: ResponseModel<Category> = await controller.create(mockCreateCategoryModel);

      expect(result).toEqual(successResponse(mockCategory));
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(mockCategory);

      const result: ResponseModel<Category> = await controller.update(mockUpdateCategoryModel);

      expect(result).toEqual(successResponse(mockCategory));
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      jest.spyOn(service, 'delete').mockResolvedValueOnce(undefined);

      const result: ResponseModel<void> = await controller.delete(mockDeleteCategoryModel);

      expect(result).toEqual({ success: true });
    });
  });
});
