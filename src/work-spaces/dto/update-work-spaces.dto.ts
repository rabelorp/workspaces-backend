// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateWorkSpacesDto } from './create-work-spaces.dto';

export class UpdateWorkSpacesDto extends PartialType(CreateWorkSpacesDto) {}
