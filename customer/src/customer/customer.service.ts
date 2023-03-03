import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';

import { CustomerRepository } from './customer.repository';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import isValidCPF from '../utils/isValidCPF';
import validateDate from '../utils/validateDate';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  async create({
    firstName,
    lastName,
    email,
    password,
    sex,
    cpf,
    birthdate,
  }: CreateCustomerDto) {
    const sameEmail = await this.customerRepository.findByEmail(email);

    if (sameEmail) {
      throw new BadRequestException('E-mail already registered.');
    }

    if (sex.toLowerCase() !== 'feminino' && sex.toLowerCase() !== 'masculino') {
      throw new BadRequestException(
        'Invalid sex information. Valid options: Feminino e Masculino',
      );
    }

    const cpfFormat = cpf.replace(/\D/g, '');

    if (!isValidCPF(cpfFormat)) {
      throw new BadRequestException('Invalid CPF');
    }

    const date = validateDate(birthdate.toString());
    const passwordHash = await hash(password, 8);

    const customer = await this.customerRepository
      .create({
        firstName,
        lastName,
        sex,
        cpf: cpfFormat,
        birthdate: date,
        email,
        password: passwordHash,
      })
      .save();

    return customer;
  }

  // findAll() {
  //   return `This action returns all customer`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} customer`;
  // }

  // update(id: number, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} customer`;
  // }
}
