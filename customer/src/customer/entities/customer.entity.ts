import { Address } from '../../address/entities/address.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cpf: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  sex: string;

  @Column({})
  birthdate: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @OneToMany((type) => Address, (address) => address.customer)
  address: Address[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
