// src/licenses/licenses.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LicensesService } from './licenses.service';
import { LicensesRepository } from './licenses.repository';
import { NotFoundException } from '@nestjs/common';

describe('LicensesService', () => {
  let service: LicensesService;
  let repository: LicensesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicensesService, LicensesRepository],
    }).compile();

    service = module.get<LicensesService>(LicensesService);
    repository = module.get<LicensesRepository>(LicensesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a license', () => {
      const createLicenseDto = { productId: 1, customerId: 1, key: '123' };
      const result = service.create(createLicenseDto);
      expect(result).toEqual({ id: expect.any(Number), ...createLicenseDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of licenses', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a license', () => {
      const createLicenseDto = { productId: 1, customerId: 1, key: '123' };
      const created = service.create(createLicenseDto);
      const result = service.findOne(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a license', () => {
      const createLicenseDto = { productId: 1, customerId: 1, key: '123' };
      const created = service.create(createLicenseDto);
      const updateLicenseDto = { id: created.id, key: '456' };
      const result = service.update(created.id, updateLicenseDto);
      expect(result.key).toBe('456');
    });

    it('should throw NotFoundException', () => {
      const updateLicenseDto = { id: 999, key: '456' };
      expect(() => service.update(999, updateLicenseDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a license', () => {
      const createLicenseDto = { productId: 1, customerId: 1, key: '123' };
      const created = service.create(createLicenseDto);
      const result = service.remove(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
