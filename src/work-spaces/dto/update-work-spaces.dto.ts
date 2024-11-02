import { PartialType } from '@nestjs/swagger';
import { CreateWorkSpacesDto } from './create-work-spaces.dto';

export class UpdateWorkSpacesDto extends PartialType(CreateWorkSpacesDto) {}
