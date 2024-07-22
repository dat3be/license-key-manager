import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './license.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private licensesRepository: Repository<License>,
  ) {}

  async create(productId: number, customerId: number): Promise<License> {
    try {
      const key = uuidv4();
      const license = this.licensesRepository.create({
        key,
        product: { id: productId },
        customer: { id: customerId },
      });
      return await this.licensesRepository.save(license);
    } catch (error) {
      console.error('Error creating license:', error);
      throw new InternalServerErrorException('Failed to create license');
    }
  }

  async findAll(): Promise<License[]> {
    try {
      return await this.licensesRepository.find({ relations: ['product', 'customer'] });
    } catch (error) {
      console.error('Error finding licenses:', error);
      throw new InternalServerErrorException('Failed to find licenses');
    }
  }

  async validate(key: string): Promise<boolean> {
    try {
      const license = await this.licensesRepository.findOne({ where: { key } });
      return !!license;
    } catch (error) {
      console.error('Error validating license:', error);
      throw new InternalServerErrorException('Failed to validate license');
    }
  }

  async assignDomain(key: string, domain: string): Promise<License> {
    try {
      const license = await this.licensesRepository.findOne({ where: { key } });
      if (license && !license.domain) {
        license.domain = domain;
        return await this.licensesRepository.save(license);
      } else {
        throw new NotFoundException('License key not found or already assigned to a domain');
      }
    } catch (error) {
      console.error('Error assigning domain to license:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to assign domain');
      }
    }
  }
}
