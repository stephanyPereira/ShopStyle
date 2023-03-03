import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Ceará' })
  state: string;

  @ApiProperty({ example: '902' })
  number: string;

  @ApiProperty({ example: '60530-280' })
  cep: string;

  @ApiProperty({ example: 1 })
  customer: number;
}
