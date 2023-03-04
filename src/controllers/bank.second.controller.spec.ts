import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BankController } from './bank.controller';
import { BankService } from '../services/bank.service';
import { Bank } from '../entities/bank.entity';

describe('BankController', () => {
  let app: INestApplication;
  let bankService: BankService;

  beforeAll(async () => {
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

    app = module.createNestApplication();
    await app.init();
    bankService = module.get<BankService>(BankService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /bank/getAll', () => {
    it('should return an array of banks', async () => {
      const banks: Bank[] = [
        { id: '1', name: 'Bank A', location: 'Location A' },
        { id: '2', name: 'Bank B', location: 'Location B' },
      ];
      jest.spyOn(bankService, 'getAll').mockResolvedValue(banks);

      const response = await request(app.getHttpServer()).get('/bank/getAll');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: banks,
      });
    });
  });

  describe('GET /bank/getOne', () => {
    it('should return a bank by ID', async () => {
      const bank: Bank = { id: '1', name: 'Bank A', location: 'Location A' };
      jest.spyOn(bankService, 'getOne').mockResolvedValue(bank);

      const response = await request(app.getHttpServer())
        .get('/bank/getOne')
        .send({ id: '1' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: bank,
      });
    });
  });

  describe('POST /bank/create', () => {
    it('should create a new bank', async () => {
      const newBank: Bank = { id: '1', name: 'Bank A', location: 'Location A' };
      jest.spyOn(bankService, 'create').mockResolvedValue(newBank);

      const response = await request(app.getHttpServer())
        .post('/bank/create')
        .send({ name: 'Bank A', location: 'Location A' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        success: true,
        data: newBank,
      });
    });
  });

  describe('POST /bank/update', () => {
    it('should update an existing bank', async () => {
      const updateBank: Bank = { id: '1', name: 'Bank A', location: 'Location B' };
      jest.spyOn(bankService, 'update').mockResolvedValue(updateBank);

      const response = await request(app.getHttpServer())
        .post('/bank/update')
        .send({ id: '1', location: 'Location B' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: updateBank,
      });
    });
  });
