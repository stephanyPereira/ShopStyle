import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.findOne({ email });

    return customer;
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.findOne({ id }, { relations: ['address'] });

    return customer;
  }
}
