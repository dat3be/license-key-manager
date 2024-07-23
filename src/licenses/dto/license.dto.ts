// src/licenses/dto/license.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLicenseDto {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty()
  @IsString()
  key: string;
}

export class UpdateLicenseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  productId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  key?: string;
}
