import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdatePasswordCustomerDto {
  @ApiProperty({ nullable: false, example: '12345678' })
  @Length(6)
  newPassword: string;
}
