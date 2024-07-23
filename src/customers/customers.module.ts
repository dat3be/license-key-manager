// src/customers/customers.module.ts
import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './customers.repository';

@Module({
  imports: [],
  providers: [CustomersService, CustomersRepository],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
