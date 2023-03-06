import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';
import { BankController } from './controllers/bank.controller';
import { CategoryController } from './controllers/category.controller';
import { TransactionController } from './controllers/transaction.controller';
import { BankService } from './services/bank.service';
import { CategoryService } from './services/category.service';
import { TransactionService } from './services/transaction.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalExceptionFilter } from './utils/exceptions';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bankTransactions',
      entities: [Bank, Category, Transaction],
      synchronize: true,
    }),
  ],
  controllers: [BankController, CategoryController, TransactionController],
  providers: [BankService, CategoryService, TransactionService, GlobalExceptionFilter],
})
export class AppModule {}
