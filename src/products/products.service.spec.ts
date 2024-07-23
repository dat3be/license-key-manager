// src/products/products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const createProductDto = { name: 'Product 1', description: 'Description 1' };
      const result = service.create(createProductDto);
      expect(result).toEqual({ id: expect.any(Number), ...createProductDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a product', () => {
      const createProductDto = { name: 'Product 1', description: 'Description 1' };
      const created = service.create(createProductDto);
      const result = service.findOne(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const createProductDto = { name: 'Product 1', description: 'Description 1' };
      const created = service.create(createProductDto);
      const updateProductDto = { id: created.id, name: 'Updated Product' };
      const result = service.update(created.id, updateProductDto);
      expect(result.name).toBe('Updated Product');
    });

    it('should throw NotFoundException', () => {
      const updateProductDto = { id: 999, name: 'Updated Product' };
      expect(() => service.update(999, updateProductDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const createProductDto = { name: 'Product 1', description: 'Description 1' };
      const created = service.create(createProductDto);
      const result = service.remove(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
