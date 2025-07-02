import { Injectable } from '@nestjs/common';
import { CreatePanelUserDto } from './dto/create-panel-user.dto';
import { UpdatePanelUserDto } from './dto/update-panel-user.dto';

@Injectable()
export class PanelUsersService {
  create(createPanelUserDto: CreatePanelUserDto) {
    return 'This action adds a new panelUser';
  }

  findAll() {
    return `This action returns all panelUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} panelUser`;
  }

  update(id: number, updatePanelUserDto: UpdatePanelUserDto) {
    return `This action updates a #${id} panelUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} panelUser`;
  }
}
