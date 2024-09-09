// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateGarageDto } from './create-garage.dto';

export class UpdateGarageDto extends PartialType(CreateGarageDto) {}
