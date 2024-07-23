// src/products/products.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const createProductDto = { name: 'Product 1', description: 'Description 1' };
      jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...createProductDto }));

      expect(controller.create(createProductDto)).toEqual({ id: 1, ...createProductDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = [{ id: 1, name: 'Product 1', description: 'Description 1' }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a product', () => {
      const result = { id: 1, name: 'Product 1', description: 'Description 1' };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const updateProductDto = { id: 1, name: 'Updated Product', description: 'Updated Description' };
      jest.spyOn(service, 'update').mockImplementation(() => updateProductDto);

      expect(controller.update('1', updateProductDto)).toBe(updateProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const result = { id: 1, name: 'Product 1', description: 'Description 1' };
      jest.spyOn(service, 'remove').mockImplementation(() => result);

      expect(controller.remove('1')).toBe(result);
    });
  });
});
