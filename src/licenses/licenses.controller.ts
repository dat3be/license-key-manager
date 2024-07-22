import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LicensesService } from './licenses.service';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() body: { productId: number; customerId: number }) {
    try {
      return await this.licensesService.create(body.productId, body.customerId);
    } catch (error) {
      console.error('Error creating license:', error);
      throw new InternalServerErrorException('Failed to create license');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.licensesService.findAll();
    } catch (error) {
      console.error('Error finding licenses:', error);
      throw new InternalServerErrorException('Failed to find licenses');
    }
  }

  @Post('validate')
  async validate(@Body() body: { key: string }) {
    try {
      const valid = await this.licensesService.validate(body.key);
      if (valid) {
        return { valid };
      } else {
        throw new NotFoundException('License key not found');
      }
    } catch (error) {
      console.error('Error validating license:', error);
      throw new InternalServerErrorException('Failed to validate license');
    }
  }

  @Post('assign-domain')
  async assignDomain(@Body() body: { key: string; domain: string }) {
    try {
      return await this.licensesService.assignDomain(body.key, body.domain);
    } catch (error) {
      console.error('Error assigning domain:', error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to assign domain');
      }
    }
  }
}
