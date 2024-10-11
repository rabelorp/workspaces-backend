// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCheckInDto } from './create-check-in.dto';

export class UpdateCheckInDto extends PartialType(CreateCheckInDto) {}
