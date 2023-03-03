import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length, Matches } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'Maria' })
  @IsOptional()
  @Length(3)
  firstName: string;

  @ApiProperty({ example: 'Oliveira' })
  @IsOptional()
  @Length(3)
  lastName: string;

  @ApiProperty({ example: '00/00/0000' })
  @IsOptional()
  @Matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, {
    message: 'birthdate must match (00/00/0000) regular expression',
  })
  birthdate: Date;

  @ApiProperty({ example: false })
  @IsOptional()
  active: boolean;
}
