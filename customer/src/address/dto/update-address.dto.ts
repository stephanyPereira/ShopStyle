import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({ example: 'Ceará' })
  state: string;

  @ApiProperty({ example: '902' })
  number: string;

  @ApiProperty({ example: '60530-280' })
  @ValidateIf((o) => o.state)
  cep: string;
}
