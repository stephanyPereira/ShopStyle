import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsEmail, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ nullable: false, example: '000.000.000-00' })
  @Matches(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/, {
    message: 'cpf must match (xxx-xxx-xxx.xx) regular expression',
  })
  cpf: string;

  @ApiProperty({ nullable: false, example: 'Maria' })
  @Length(3)
  firstName: string;

  @ApiProperty({ nullable: false, example: 'Oliveira' })
  @Length(3)
  lastName: string;

  @ApiProperty({ nullable: false, example: 'Feminino' })
  sex: string;

  @ApiProperty({ nullable: false, example: '00/00/0000' })
  @Matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, {
    message: 'birthdate must match (00/00/0000) regular expression',
  })
  birthdate: Date;

  @ApiProperty({ nullable: false, example: 'maria@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ nullable: false, example: '12345678' })
  @Length(6)
  password: string;
}
