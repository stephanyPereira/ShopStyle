import { BadRequestException } from '@nestjs/common';
import { isAfter, isValid } from 'date-fns';

export default function validateDate(date: string): Date {
  const day = date.split('/')[0];
  const month = date.split('/')[1];
  const year = date.split('/')[2];

  const dateFormat = new Date(
    `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(
      -2,
    )}T00:00:00.003-03:00`,
  );

  if (!isValid(dateFormat)) {
    throw new BadRequestException('Invalid Date');
  }

  if (isAfter(dateFormat, Date.now())) {
    throw new BadRequestException('The given date is in the future');
  }

  return dateFormat;
}
