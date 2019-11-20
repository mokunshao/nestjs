import { Controller, Get, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreatePostDto } from './createPostDto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from 'src/core/filters/demo.filter';
import { DemoAuthGuard } from 'src/core/guards/demo-auth.guard';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('posts')
// @UseFilters(DemoFilter)
@UseGuards(DemoAuthGuard)
export class PostsController {
  constructor(private readonly demoService: DemoService) {
  }

  @Get()
  // @UseFilters(DemoFilter)
  index() {
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
  store(@Body() post: CreatePostDto) {
    this.demoService.create(post);
  }
}
