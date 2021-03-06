import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UpdatePasswordDto } from './user.updatePassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/guards/access.guard';
import { Permission } from 'src/core/decorators/permissions.decorator';
import { UserRole } from 'src/core/enums/user-role.enum';

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

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userServie.liked(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AccessGuard)
  @Permission({ role: UserRole.ADMIN })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserDto,
  ) {
    return this.userServie.update(id, data);
  }

  @Get(':id/possess/:resource/:resourceId')
  async possess(
    @Param('id', ParseIntPipe) id: number,
    @Param('resource') resource: string,
    @Param('resourceId', ParseIntPipe) resourceId: number,
  ) {
    return await this.userServie.possess(id, resource, resourceId);
  }
}
