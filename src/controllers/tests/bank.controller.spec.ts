import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from '../bank.controller';
import { BankService } from '../../services/bank.service';
import { ResponseModel, successResponse } from '../../models/response.model';
import { Bank } from '../../entities/bank.entity';

describe('BankController', () => {
  let controller: BankController;
  let service: BankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        {
          provide: BankService,
          useValue: {
            getAll: jest.fn(),
            getOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BankController>(BankController);
    service = module.get<BankService>(BankService);
  });

  describe('getAll', () => {
    it('should return an array of banks', async () => {
      const banks: Bank[] = [{ id: '1', name: 'Bank 1', balance: 100, transactions: [] }];
      jest.spyOn(service, 'getAll').mockResolvedValue(banks);
      const result: ResponseModel<Bank[]> = await controller.getAll();
      expect(result).toEqual(successResponse(banks));
    });
  });

  describe('getOne', () => {
    it('should return a bank', async () => {
      const bank: Bank = { id: '1', name: 'Bank 1', balance: 100, transactions: [] };
      jest.spyOn(service, 'getOne').mockResolvedValue(bank);
      const result: ResponseModel<Bank> = await controller.getOne({ id: '1' });
      expect(result).toEqual(successResponse(bank));
    });
  });

  describe('create', () => {
    it('should create a bank', async () => {
      const bank: Bank = { id: '1', name: 'Bank 1', balance: 0, transactions: [] };
      const bankCreateModel = { name: 'Bank 1' };
      jest.spyOn(service, 'create').mockResolvedValue(bank);
      const result: ResponseModel<Bank> = await controller.create(bankCreateModel);
      expect(result).toEqual(successResponse(bank));
    });
  });

  describe('update', () => {
    it('should update a bank', async () => {
      const bank: Bank = { id: '1', name: 'Bank 1', balance: 0, transactions: [] };
      const bankUpdateModel = { id: '1', name: 'Bank 2' };
      jest.spyOn(service, 'update').mockResolvedValue(bank);
      const result: ResponseModel<Bank> = await controller.update(bankUpdateModel);
      expect(result).toEqual(successResponse(bank));
    });
  });

  describe('delete', () => {
    it('should delete a bank', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);
      const result: ResponseModel<void> = await controller.delete({ id: '1' });
      expect(result).toEqual(successResponse(undefined));
    });
  });
});
