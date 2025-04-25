import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../domain/entity/customer.entity';
import { CustomerRepository } from '../../domain/repository/customer.repository';
import { CurrentUserService } from 'src/modules/auth/service/currenty.user.service';

@Injectable()
export class GetCustomerUseCase {
  constructor(
    @Inject('CustomerRepository') private readonly customerRepository: CustomerRepository,
    private readonly currentUserService: CurrentUserService
  ) {}

  async execute(): Promise<CustomerOutputDto> {
    const currentUser = await this.currentUserService.getUser();
    const customerId = currentUser?.id;
    if (!customerId) {
      throw new Error("Customer ID not provided in the current user context");
    }
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return CustomerOutputDto.fromDomain(customer);
  }
}

export class CustomerOutputDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  feedbacks = [];
  requestHistory = [];

  constructor(id: string, name: string, email: string, phone: string | undefined) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone ?? '';
  }

  static fromDomain(customer: Customer): CustomerOutputDto {
    return new CustomerOutputDto(
      customer.getId(),
      customer.getName(),
      customer.getEmail(),
      customer.getPhone()
    );
  }
}