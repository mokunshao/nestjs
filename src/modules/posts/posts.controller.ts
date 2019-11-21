import { Controller, Get, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors, Req } from '@nestjs/common';
import { CreatePostDto } from './createPostDto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from 'src/core/filters/demo.filter';
import { DemoAuthGuard } from 'src/core/guards/demo-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ErrorsInterceptor } from 'src/core/interceptors/errors.interceptor';
import { User } from 'src/core/decorators/user.decorator';

@Controller('posts')
// @UseFilters(DemoFilter)
@UseGuards(DemoAuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
  constructor(private readonly demoService: DemoService) {
  }

  @Get()
  // @UseFilters(DemoFilter)
  @UseInterceptors(TransformInterceptor)
  // @UseInterceptors(ErrorsInterceptor)
  index() {
    // throw new ForbiddenException();
    return this.demoService.findAll();
    // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN)
    // throw new ForbiddenException('没有权限')
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    const content = `Post ${typeof id} ${id}`;
    console.log(content);
    return content;
  }

  @Post()
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles', ['member'])
  @Roles('member')
  store(@Body() post: CreatePostDto, @User() user) {
    console.log(user);
    this.demoService.create(post);
  }
}
