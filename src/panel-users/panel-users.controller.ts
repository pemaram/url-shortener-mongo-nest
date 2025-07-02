import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PanelUsersService } from './panel-users.service';
import { CreatePanelUserDto } from './dto/create-panel-user.dto';
import { UpdatePanelUserDto } from './dto/update-panel-user.dto';

@Controller('panel-users')
export class PanelUsersController {
  constructor(private readonly panelUsersService: PanelUsersService) {}

  @Post()
  create(@Body() createPanelUserDto: CreatePanelUserDto) {
    return this.panelUsersService.create(createPanelUserDto);
  }

  @Get()
  findAll() {
    return this.panelUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panelUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanelUserDto: UpdatePanelUserDto) {
    return this.panelUsersService.update(+id, updatePanelUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.panelUsersService.remove(+id);
  }
}
