// src/licenses/licenses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { LicensesRepository } from './licenses.repository';
import { CreateLicenseDto, UpdateLicenseDto } from './dto/license.dto';
import { License } from './interfaces/license.interface';

@Injectable()
export class LicensesService {
  constructor(private readonly licensesRepository: LicensesRepository) {}

  create(createLicenseDto: CreateLicenseDto): License {
    const newLicense = { id: Date.now(), ...createLicenseDto };
    return this.licensesRepository.create(newLicense);
  }

  findAll(): License[] {
    return this.licensesRepository.findAll();
  }

  findOne(id: number): License {
    return this.licensesRepository.findOne(id);
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto): License {
    return this.licensesRepository.update(id, updateLicenseDto);
  }

  remove(id: number): License {
    return this.licensesRepository.remove(id);
  }
}
