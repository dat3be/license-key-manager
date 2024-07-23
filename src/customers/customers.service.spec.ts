// src/customers/customers.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { NotFoundException } from '@nestjs/common';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: CustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', () => {
      const createCustomerDto = { name: 'John Doe', email: 'john@example.com' };
      const expectedCustomer = { id: 1, ...createCustomerDto };

      jest.spyOn(repository, 'create').mockImplementation(() => expectedCustomer);

      expect(service.create(createCustomerDto)).toEqual(expectedCustomer);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', () => {
      const expectedCustomers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(repository, 'findAll').mockImplementation(() => expectedCustomers);

      expect(service.findAll()).toEqual(expectedCustomers);
    });
  });

  describe('findOne', () => {
    it('should return a customer', () => {
      const expectedCustomer = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(repository, 'findOne').mockImplementation(() => expectedCustomer);

      expect(service.findOne(1)).toEqual(expectedCustomer);
    });

    it('should throw NotFoundException', () => {
      jest.spyOn(repository, 'findOne').mockImplementation(() => null);

      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a customer', () => {
      const updateCustomerDto = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
      const expectedCustomer = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };

      jest.spyOn(repository, 'update').mockImplementation(() => expectedCustomer);

      expect(service.update(1, updateCustomerDto)).toEqual(expectedCustomer);
    });

    it('should throw NotFoundException', () => {
      const updateCustomerDto = { id: 999, name: 'Jane Doe', email: 'jane@example.com' };
      jest.spyOn(repository, 'update').mockImplementation(() => null);

      expect(() => service.update(999, updateCustomerDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a customer', () => {
      const expectedCustomer = { id: 1, name: 'John Doe', email: 'john@example.com' };
      jest.spyOn(repository, 'remove').mockImplementation(() => expectedCustomer);

      expect(service.remove(1)).toEqual(expectedCustomer);
    });

    it('should throw NotFoundException', () => {
      jest.spyOn(repository, 'remove').mockImplementation(() => null);

      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
