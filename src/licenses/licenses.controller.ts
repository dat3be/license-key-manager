// src/licenses/licenses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto, UpdateLicenseDto } from './dto/license.dto';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licensesService.create(createLicenseDto);
  }

  @Get()
  findAll() {
    return this.licensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    return this.licensesService.update(+id, updateLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licensesService.remove(+id);
  }
}
