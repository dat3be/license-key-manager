// src/licenses/licenses.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { License } from './interfaces/license.interface';

@Injectable()
export class LicensesRepository {
  private licenses: License[] = [];

  create(license: License): License {
    this.licenses.push(license);
    return license;
  }

  findAll(): License[] {
    return this.licenses;
  }

  findOne(id: number): License {
    const license = this.licenses.find(lic => lic.id === id);
    if (!license) throw new NotFoundException('License not found');
    return license;
  }

  update(id: number, updatedLicense: Partial<License>): License {
    const licenseIndex = this.licenses.findIndex(lic => lic.id === id);
    if (licenseIndex === -1) throw new NotFoundException('License not found');
    this.licenses[licenseIndex] = { ...this.licenses[licenseIndex], ...updatedLicense };
    return this.licenses[licenseIndex];
  }

  remove(id: number): License {
    const licenseIndex = this.licenses.findIndex(lic => lic.id === id);
    if (licenseIndex === -1) throw new NotFoundException('License not found');
    const [removedLicense] = this.licenses.splice(licenseIndex, 1);
    return removedLicense;
  }
}
