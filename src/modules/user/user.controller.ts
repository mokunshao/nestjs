import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userServie: UserService,
  ) { }

  @Post()
  async store(@Body() data: UserDto) {
    return await this.userServie.store(data);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.userServie.show(id);
  }
}
