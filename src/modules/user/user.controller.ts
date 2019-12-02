import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UpdatePasswordDto } from './user.updatePassword.dto';

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
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    return await this.userServie.show(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
    return await this.userServie.updatePassword(id, data);
  }
}
