import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';

import { CustomerRepository } from './customer.repository';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import isValidCPF from '../utils/isValidCPF';
import validateDate from '../utils/validateDate';
import { format } from 'date-fns';
import { UpdatePasswordCustomerDto } from './dto/update-password-customer';

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

    return await this.findOne(customer.id);
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new BadRequestException('Consumer not found.');
    }

    delete customer.password;

    return {
      ...customer,
      birthdate: format(new Date(customer.birthdate), 'dd/MM/yyyy'),
      cpf: customer.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findById(id);

    await this.customerRepository.save({
      ...customer,
      ...updateCustomerDto,
    });

    return await this.findOne(id);
  }

  async updatePassword(
    id: number,
    updatePasswordCustomerDto: UpdatePasswordCustomerDto,
  ) {
    const customer = await this.customerRepository.findById(id);

    await this.customerRepository.save({
      ...customer,
      password: updatePasswordCustomerDto.newPassword,
    });

    return await this.findOne(id);
  }
}
