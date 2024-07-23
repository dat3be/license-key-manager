// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
