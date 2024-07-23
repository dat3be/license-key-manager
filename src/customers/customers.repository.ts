// src/customers/customers.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersRepository {
  private customers: Customer[] = [];

  create(customer: Customer): Customer {
    this.customers.push(customer);
    return customer;
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: number): Customer {
    const customer = this.customers.find(cust => cust.id === id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  update(id: number, updatedCustomer: Partial<Customer>): Customer {
    const customerIndex = this.customers.findIndex(cust => cust.id === id);
    if (customerIndex === -1) throw new NotFoundException('Customer not found');
    this.customers[customerIndex] = { ...this.customers[customerIndex], ...updatedCustomer };
    return this.customers[customerIndex];
  }

  remove(id: number): Customer {
    const customerIndex = this.customers.findIndex(cust => cust.id === id);
    if (customerIndex === -1) throw new NotFoundException('Customer not found');
    const [removedCustomer] = this.customers.splice(customerIndex, 1);
    return removedCustomer;
  }
}
