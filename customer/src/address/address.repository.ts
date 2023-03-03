import axios from 'axios';
import { EntityRepository, Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async findStates() {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderby=nome`,
    );

    return data;
  }

  async findCep(cep: string) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return data;
  }

  async findById(id: number): Promise<Address> {
    return await this.findOne({ id });
  }
}
