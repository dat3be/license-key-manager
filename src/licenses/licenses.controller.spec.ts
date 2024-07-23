// src/licenses/licenses.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { LicensesRepository } from './licenses.repository';

describe('LicensesController', () => {
  let controller: LicensesController;
  let service: LicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensesController],
      providers: [
        LicensesService,
        {
          provide: LicensesRepository,
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

    controller = module.get<LicensesController>(LicensesController);
    service = module.get<LicensesService>(LicensesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a license', () => {
      const createLicenseDto = { productId: 1, customerId: 1, key: '123' };
      jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...createLicenseDto }));

      expect(controller.create(createLicenseDto)).toEqual({ id: 1, ...createLicenseDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of licenses', () => {
      const result = [{ id: 1, productId: 1, customerId: 1, key: '123' }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a license', () => {
      const result = { id: 1, productId: 1, customerId: 1, key: '123' };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a license', () => {
      const updateLicenseDto = { id: 1, productId: 1, customerId: 1, key: '456' };
      jest.spyOn(service, 'update').mockImplementation(() => updateLicenseDto);

      expect(controller.update('1', updateLicenseDto)).toBe(updateLicenseDto);
    });
  });

  describe('remove', () => {
    it('should remove a license', () => {
      const result = { id: 1, productId: 1, customerId: 1, key: '123' };
      jest.spyOn(service, 'remove').mockImplementation(() => result);

      expect(controller.remove('1')).toBe(result);
    });
  });
});
