// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto): Product {
    const newProduct = { id: Date.now(), ...createProductDto };
    return this.productsRepository.create(newProduct);
  }

  findAll(): Product[] {
    return this.productsRepository.findAll();
  }

  findOne(id: number): Product {
    return this.productsRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: number): Product {
    return this.productsRepository.remove(id);
  }
}
