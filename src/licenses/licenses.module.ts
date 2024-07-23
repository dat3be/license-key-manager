// src/licenses/licenses.module.ts
import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { LicensesRepository } from './licenses.repository';

@Module({
  imports: [],
  providers: [LicensesService, LicensesRepository],
  controllers: [LicensesController],
  exports: [LicensesService],
})
export class LicensesModule {}
