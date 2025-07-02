import { PartialType } from '@nestjs/swagger';
import { CreatePanelUserDto } from './create-panel-user.dto';

export class UpdatePanelUserDto extends PartialType(CreatePanelUserDto) {}
