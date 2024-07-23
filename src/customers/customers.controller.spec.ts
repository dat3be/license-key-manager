// src/customers/customers.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: CustomersRepository,
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

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', () => {
      const createCustomerDto = { name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...createCustomerDto }));

      expect(controller.create(createCustomerDto)).toEqual({ id: 1, ...createCustomerDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', () => {
      const result = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a customer', () => {
      const result = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a customer', () => {
      const updateCustomerDto = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
      jest.spyOn(service, 'update').mockImplementation(() => updateCustomerDto);

      expect(controller.update('1', updateCustomerDto)).toBe(updateCustomerDto);
    });
  });

  describe('remove', () => {
    it('should remove a customer', () => {
      const result = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(service, 'remove').mockImplementation(() => result);

      expect(controller.remove('1')).toBe(result);
    });
  });
});
