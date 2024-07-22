import { Test, TestingModule } from '@nestjs/testing';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { NotFoundException } from '@nestjs/common';

describe('LicensesController', () => {
  let controller: LicensesController;
  let service: LicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensesController],
      providers: [
        {
          provide: LicensesService,
          useValue: {
            assignDomain: jest.fn().mockImplementation((key, domain) => {
              if (key === 'invalid-key') {
                throw new NotFoundException('License key not found or already assigned to a domain');
              }
              return { key, domain };
            }),
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

  it('should throw an error when assigning a domain to an invalid license key', async () => {
    await expect(
      controller.assignDomain({ key: 'invalid-key', domain: 'example.com' }),
    ).rejects.toThrow('License key not found or already assigned to a domain');
  });
});
