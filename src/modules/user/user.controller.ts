import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userServie: UserService,
  ) { }

  @Post()
  async store(@Body() data: UserDto) {
    return this.userServie.store(data);
  }
}
