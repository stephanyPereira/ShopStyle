import { Customer } from '../../customer/entities/customer.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: true })
  complement: string;

  @ManyToOne((type) => Customer, (customer) => customer.id)
  @Column({ nullable: false })
  customer: number;

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
