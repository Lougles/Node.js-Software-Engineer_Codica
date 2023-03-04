import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BankController } from './bank.controller';
import { BankService } from '../services/bank.service';
import { BankCreateModel, BankDeleteModel, BankUpdateModel } from '../models/bank.model';
import * as httpMocks from 'node-mocks-http';

describe('ProductController', () => {
  let bankController: BankController;

  const mockBank: BankCreateModel = {
    name: 'newBank',
  };

  const mockBankService = {
    createBank: jest.fn().mockImplementation((bank: BankCreateModel) => {
      return {
        id: 1,
        name: bank.name,
      };
    }),
  };
  const mockUserService = {};

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [BankService],
    })
      .overrideProvider(BankService)
      .useValue(mockBankService)
      .compile();

    bankController = moduleRef.get<BankController>(BankController);
  });
  it('should create a bank', () => {
    expect(bankController.create(mockBank)).toEqual({
      // id: expect.any(Number),
      name: expect.any(name),
    });
  });
});
