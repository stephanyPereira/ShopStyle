import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private addressRepository: AddressRepository,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const states = await this.findStates();

    if (!states.includes(createAddressDto.state.toLowerCase())) {
      throw new BadRequestException('State not found.');
    }

    const cep = await this.addressRepository.findCep(createAddressDto.cep);

    if (cep.erro) {
      throw new BadRequestException('Invalid CEP');
    }

    const cepFormat = createAddressDto.cep.replace(/\D/g, '');

    return await this.addressRepository
      .create({
        state: createAddressDto.state,
        city: cep.localidade,
        district: cep.bairro,
        street: cep.logradouro,
        number: createAddressDto.number,
        cep: cepFormat,
        complement: cep.complemento,
        customer: createAddressDto.customer,
      })
      .save();
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const findAddress = this.addressRepository.findById(id);

    if (!findAddress) {
      throw new BadRequestException('Invalid Customer ID');
    }

    const address: any = {};

    if (updateAddressDto.state) {
      const states = await this.findStates();

      if (!states.includes(updateAddressDto.state.toLowerCase())) {
        throw new BadRequestException('State not found.');
      }

      address.state = updateAddressDto.state;
    }

    if (updateAddressDto.number) {
      address.number = updateAddressDto.number;
    }

    if (updateAddressDto.cep) {
      const cep = await this.addressRepository.findCep(updateAddressDto.cep);

      if (cep.erro) {
        throw new BadRequestException('Invalid CEP');
      }

      const cepFormat = updateAddressDto.cep.replace(/\D/g, '');

      address.cep = cepFormat;
      address.city = cep.localidade;
      address.district = cep.bairro;
      address.street = cep.logradouro;
      address.complement = cep.complemento;
    }

    await this.addressRepository.save({
      ...findAddress,
      ...address,
    });
  }

  async remove(id: number) {
    await this.addressRepository.delete(id);
  }

  private async findStates() {
    const statesFormatted = [];
    const states = await this.addressRepository.findStates();

    for (let i = 0; i < states.length; i++) {
      statesFormatted[i] = states[i].nome.toLowerCase();
    }

    return statesFormatted;
  }
}
