// src/products/products.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(prod => prod.id === id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  update(id: number, updatedProduct: Partial<Product>): Product {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    if (productIndex === -1) throw new NotFoundException('Product not found');
    this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
    return this.products[productIndex];
  }

  remove(id: number): Product {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    if (productIndex === -1) throw new NotFoundException('Product not found');
    const [removedProduct] = this.products.splice(productIndex, 1);
    return removedProduct;
  }
}
