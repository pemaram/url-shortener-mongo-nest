import { Module } from '@nestjs/common';
import { PanelUsersService } from './panel-users.service';
import { PanelUsersController } from './panel-users.controller';

@Module({
  controllers: [PanelUsersController],
  providers: [PanelUsersService],
})
export class PanelUsersModule {}
