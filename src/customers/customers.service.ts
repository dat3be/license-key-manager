// src/customers/customers.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  create(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer = { id: Date.now(), ...createCustomerDto };
    return this.customersRepository.create(newCustomer);
  }

  findAll(): Customer[] {
    return this.customersRepository.findAll();
  }

  findOne(id: number): Customer {
    return this.customersRepository.findOne(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto): Customer {
    return this.customersRepository.update(id, updateCustomerDto);
  }

  remove(id: number): Customer {
    return this.customersRepository.remove(id);
  }
}
